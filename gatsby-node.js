/**
 * The AnVIL
 * https://www.anvilproject.org
 */

const express = require("express");
const { createFilePath } = require("gatsby-source-filesystem");
const { buildPostSlug } = require("./src/utils/node/create-node.service");
const {
  buildDocumentTitleBySlug,
  buildMenuItems,
  buildSetOfNavItemsByMenuItem,
  buildSetOfSiteSlugs,
  buildSlugNavigations,
  ComponentPath,
  getSlugComponent,
  isShouldCreatePage,
} = require("./src/utils/node/create-pages.service");
const {
  buildDateBubbleField,
  buildDateStartField,
  buildPageCreatedField,
  buildSessionsDisplayField,
} = require("./src/utils/node/schema-customization.service");

/**
 * Create new node fields.
 * Places nodes under the "fields" keys on the extended node object.
 *
 * @param actions
 * @param getNode
 * @param node
 */
exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions;
  const { internal } = node,
    { type } = internal;

  if (type === "MarkdownRemark") {
    const { frontmatter } = node,
      { privateEvent } = frontmatter || {};

    /* Extended node fields. */
    const filePath = createFilePath({ node, getNode, basePath: "" });
    const nodeValuePrivateEvent = privateEvent ? privateEvent : false;
    const nodeValueSlug = buildPostSlug(filePath);

    createNodeField({
      node,
      name: "privateEvent",
      value: nodeValuePrivateEvent,
    });
    createNodeField({
      node,
      name: "slug",
      value: nodeValueSlug,
    });
  }
};

/**
 * Create pages.
 *
 * @param actions
 * @param graphql
 */
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              privateEvent
              slug
            }
            frontmatter {
              breadcrumb {
                link
                name
              }
              date
              dateStart
              description
              title
              tutorial
            }
          }
        }
      }
      allSiteMapYaml {
        edges {
          node {
            menuItem
            pageTitle
            pathPartial
            tabs {
              name
              pathPartial
              navigationItems {
                draft
                file
                name
                navigationItems {
                  draft
                  file
                  name
                  pathOverride
                }
                pathOverride
                pathPartial
              }
            }
          }
        }
      }
    }
  `).then((result) => {
    /* If there is an error, return. */
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const { data } = result,
      { allMarkdownRemark, allSiteMapYaml } = data;

    /* Build menuItems where each site map document associates the slug with a path. */
    /* This will be used to create the correct path for each post. */
    const siteMapNodes = allSiteMapYaml.edges.map((n) => n.node);
    const menuItems = buildMenuItems(siteMapNodes);

    /* Builds a set of navigation items for each menu item. */
    /* Builds next and previous article links in order of appearance in the site map. */
    const setOfNavItemsByMenuItem = buildSetOfNavItemsByMenuItem(menuItems);

    /* Build the complete set of site document slugs (allowable slugs to be created into a page). */
    const setOfSiteSlugs = buildSetOfSiteSlugs(menuItems);

    /* Build a relationship between document slug and associated document title. */
    /* This will be used to create next/previous page links for each document, when "name" is undefined in the site map for any nav Item. */
    const documentTitleBySlug = buildDocumentTitleBySlug(
      allMarkdownRemark,
      setOfSiteSlugs
    );

    /* For each markdown file create a post. */
    allMarkdownRemark.edges.forEach(({ node }) => {
      const { id, fields } = node,
        { slug } = fields;

      /* Create a page, if there is a slug and the file exists on the site map. */
      if (isShouldCreatePage(slug, setOfSiteSlugs)) {
        /* Grab the slug's pageTitle, tabs, navItems and path. */
        const slugNavigations = buildSlugNavigations(
          slug,
          menuItems,
          setOfNavItemsByMenuItem,
          documentTitleBySlug
        );
        const slugComponent = getSlugComponent(ComponentPath.CONTENT);

        /* Create page. */
        createPage({
          path: slugNavigations.path,
          component: slugComponent,
          context: {
            id: id,
            menuPath: slugNavigations.menuPath,
            navItemNext: slugNavigations.navItemNext,
            navItemPrevious: slugNavigations.navItemPrevious,
            navItems: slugNavigations.navItems,
            slug: slug,
            tabPath: slugNavigations.tabPath,
            tabs: slugNavigations.tabs,
            title: slugNavigations.title,
          },
        });
      }
    });
  });
};

/**
 * Schema customization.
 *
 * @param actions
 * @returns {*}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions;

  /* Create field "dateBubble" of type string array. */
  createFieldExtension({
    name: "dateBubble",
    extend() {
      return {
        resolve(source) {
          return buildDateBubbleField(source);
        },
      };
    },
  });
  /* Create field "dateStart" of type date. */
  createFieldExtension({
    name: "dateStart",
    extend() {
      return {
        resolve(source) {
          return buildDateStartField(source);
        },
      };
    },
  });
  /* Create field "draft" of type boolean. */
  createFieldExtension({
    name: "draft",
    extend() {
      return {
        resolve(source) {
          /* Returns false when draft is undefined. */
          if (source.draft === undefined) {
            return false;
          }
          return JSON.parse(source.draft.toLowerCase());
        },
      };
    },
  });
  /* Create field "featured" of type boolean. */
  createFieldExtension({
    name: "featured",
    extend() {
      return {
        resolve(source) {
          /* Returns false value when featured is undefined. */
          if (source.featured === undefined) {
            return false;
          }
          return source.featured;
        },
      };
    },
  });
  /* Create field "hashtag" of type string. */
  createFieldExtension({
    name: "hashtag",
    extend() {
      return {
        resolve(source) {
          /* Returns empty string when hashtag is undefined. */
          if (source.hashtag === undefined) {
            return "";
          }
          return source.hashtag;
        },
      };
    },
  });
  /* Create field "pageCreated" of type boolean. */
  createFieldExtension({
    name: "pageCreated",
    extend() {
      return {
        async resolve(source, arg, context, info) {
          const { entries } = await context.nodeModel.findAll({
            type: "SitePage",
          });
          return buildPageCreatedField(source, [...entries]);
        },
      };
    },
  });
  /* Create field "sessionsDisplay" of type string array. */
  createFieldExtension({
    name: "sessionsDisplay",
    extend() {
      return {
        resolve(source) {
          return buildSessionsDisplayField(source);
        },
      };
    },
  });
  /* Create field "showOutline" of type boolean. */
  createFieldExtension({
    name: "showOutline",
    extend() {
      return {
        resolve(source) {
          /* Returns true value when showOutline is undefined. */
          if (source.showOutline === undefined) {
            return true;
          }
          return source.showOutline;
        },
      };
    },
  });
  /* Create field "tutorial" of type boolean. */
  createFieldExtension({
    name: "tutorial",
    extend() {
      return {
        resolve(source) {
          /* Returns false when tutorial is undefined. */
          if (source.tutorial === undefined) {
            return false;
          }
          return source.tutorial;
        },
      };
    },
  });

  createTypes(`
    type Breadcrumb @dontInfer {
        link: String
        name: String
    }
    type Card {
        actions: [CardAction]
        cardLink: String
        citation: Citation
        media: Media
        subTitle: String
        supportingText: String
        thumbnail: File @fileByRelativePath
        title: String
    }
    extend type Card {
        category: String
    }
    type CardAction {
        label: String
        url: String
    }
    type Citation {
        authors: [String]
        doi: String
        journal: String
        publisher: String
        year: String
    }
    type Frontmatter {
        benefits: [Card]
        breadcrumb: Breadcrumb
        conference: String
        datasets: [Card]
        dateBubble: [String] @dateBubble
        dateStart: Date @dateStart
        description: String
        eventType: String
        featured: Boolean @featured
        hashtag: String @hashtag
        location: String
        publications: [Card]
        sectionSubHeader: String
        sessions: [Session]
        sessionsDisplay: [String] @sessionsDisplay
        showOutline: Boolean @showOutline
        slides: [Card]
        subTitle: String
        technologies: [Card]
        timezone: String
        title: String
        tutorial: Boolean @tutorial
        workspaces: [Card]
    }
    type MarkdownRemark implements Node {
        frontmatter: Frontmatter
        pageCreated: Boolean @pageCreated
    }
    type Media implements Node {
        landscape: File @fileByRelativePath
        portrait: File @fileByRelativePath
    }
    type MenuItem implements Node {
        name: String
        path: String
        subMenuItems: [MenuItem]
    }
    type NavigationItems implements Node {
        draft: Boolean @draft
        file: String
        name: String
        navigationItems: [NavigationItems]
        pathOverride: String
        pathPartial: String
    }
    type Session {
        sessionEnd: String
        sessionStart: String
    }
    type SiteMapYaml implements Node {
        menuItem: String
        pageTitle: String
        pathPartial: String
        tabs: [Tab]
    }
    type Tab implements Node {
        name: String
        navigationItems: [NavigationItems]
        pathPartial: String
    }`);
};

// Required for Edge. This function can be removed once Gatsby upgrades to @babel-preset-gatsby@0.2.3. See:
// https://github.com/gatsbyjs/gatsby/issues/14848
exports.onCreateBabelConfig = ({ actions, stage }) => {
  actions.setBabelPlugin({
    name: `@babel/plugin-transform-spread`,
    options: {
      loose: false,
    },
  });
};

// See: https://github.com/gatsbyjs/gatsby/issues/18213
// See: https://github.com/gatsbyjs/gatsby/issues/13072
// To access static folder while in develop mode
exports.onCreateDevServer = ({ app }) => {
  app.use(express.static("public"));
};
