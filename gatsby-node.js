/**
 * The AnVIL
 * https://www.anvilproject.org
 */

const express = require("express");
const {fmImagesToRelative} = require("gatsby-remark-relative-images");
const {createFilePath} = require("gatsby-source-filesystem");
const {buildPostSlug} = require("./src/utils/node/create-node.service");
const {buildMenuItems, buildSetOfNavItemsByMenuItem, getPostComponent, getPostNavigations} = require("./src/utils/node/create-pages.service");
const {buildDateBubbleField, buildDateStartField, buildHeadersField, buildSessionsDisplayField} = require("./src/utils/node/schema-customization.service");

/**
 * Create new node fields.
 * Places nodes under the "fields" keys on the extended node object.
 *
 * @param actions
 * @param getNode
 * @param node
 */
exports.onCreateNode = ({actions, getNode, node}) => {

    const {createNodeField} = actions;
    const {internal} = node,
        {type} = internal;
    fmImagesToRelative(node);

    if ( type === "MarkdownRemark" ) {

        const {frontmatter} = node,
            {draft, pageAlignment, privateEvent} = frontmatter || {};

        /* Extended node fields. */
        const filePath = createFilePath({node, getNode, basePath: ""});
        const nodeValueDraft = draft ? draft : false;
        const nodeValuePrivateEvent = privateEvent ? privateEvent : false;
        const nodeValueSlug = buildPostSlug(filePath);
        const nodeValueStyles = {alignment: pageAlignment};

        createNodeField({
            node,
            name: "draft",
            value: nodeValueDraft,
        });
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
        createNodeField({
            node,
            name: "styles",
            value: nodeValueStyles,
        });
    }
};

/**
 * Create pages.
 *
 * @param actions
 * @param graphql
 */
exports.createPages = ({actions, graphql}) => {

    const {createPage} = actions;

    return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              draft
              slug
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
                name
                file
                navigationItems {
                  name
                  file
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
  `).then(result => {

        /* If there is an error, return. */
        if ( result.errors ) {

            return Promise.reject(result.errors);
        }

        const {data} = result,
            {allMarkdownRemark, allSiteMapYaml} = data;

        /* Build menuItems where each site map document associates the slug with a path. */
        /* This will be used to create the correct path for each post. */
        const menuItems = buildMenuItems(allSiteMapYaml);

        /* Builds a set of navigation items for each menu item. */
        /* Builds next and previous article links in order of appearance in the site map. */
        const setOfNavItemsByMenuItem = buildSetOfNavItemsByMenuItem(menuItems);

        /* For each markdown file create a post. */
        allMarkdownRemark.edges.forEach(({node}) => {

            const {id, fields} = node,
                {draft, slug} = fields;

            /* Grab the post's pageTitle, tabs, navItems and path. */
            const postNavigations = getPostNavigations(slug, menuItems, setOfNavItemsByMenuItem);
            const postComponent = getPostComponent();

            /* Create a page, if there is a slug. */
            if ( slug ) {

                createPage({
                    path: postNavigations.path,
                    component: postComponent,
                    context: {
                        id: id,
                        draft: draft,
                        navItemNext: postNavigations.navItemNext,
                        navItemPrevious: postNavigations.navItemPrevious,
                        navItems: postNavigations.navItems,
                        slug: slug,
                        tabs: postNavigations.tabs,
                        title: postNavigations.title
                    }
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
exports.createSchemaCustomization = ({actions}) => {

    const {createFieldExtension, createTypes} = actions;

    /* Create field "dateBubble" of type string array. */
    createFieldExtension({
        name: "dateBubble",
        extend() {
            return {
                resolve(source) {
                    return buildDateBubbleField(source);
                },
            }
        }
    });
    /* Create field "dateStart" of type date. */
    createFieldExtension({
        name: "dateStart",
        extend() {
            return {
                resolve(source) {
                    return buildDateStartField(source);
                },
            }
        }
    });
    /* Create field "featured" of type boolean. */
    createFieldExtension({
        name: "featured",
        extend() {
            return {
                resolve(source) {
                    /* Returns false value when featured is undefined. */
                    if ( source.featured === undefined ) {

                        return false;
                    }
                    return source.featured;
                },
            }
        }
    });
    /* Create field "headers" of type header array. */
    createFieldExtension({
        name: "headers",
        extend() {
            return {
                resolve(source, arg, context, info) {
                    const items = context.nodeModel.getAllNodes({type: "SiteMapYaml"});
                    return buildHeadersField(source, items);
                },
            }
        }
    });
    /* Create field "sessionsDisplay" of type string array. */
    createFieldExtension({
        name: "sessionsDisplay",
        extend() {
            return {
                resolve(source) {
                    return buildSessionsDisplayField(source);
                },
            }
        }
    });
    /* Create field "showOutline" of type boolean. */
    createFieldExtension({
        name: "showOutline",
        extend() {
            return {
                resolve(source) {
                    /* Returns true value when showOutline is undefined. */
                    if ( source.showOutline === undefined ) {

                        return true;
                    }
                    return source.showOutline;
                },
            }
        }
    });

    createTypes(`
    type Frontmatter {
        conference: String
        dateBubble: [String] @dateBubble
        dateStart: Date @dateStart
        description: String
        eventType: String
        featured: Boolean @featured
        location: String
        sessions: [Session]
        sessionsDisplay: [String] @sessionsDisplay
        showOutline: Boolean @showOutline
        subTitle: String
        timezone: String
        title: String
    }
    type Header implements Node {
        name: String
        path: String
    }
    type MarkdownRemark implements Node {
        frontmatter: Frontmatter
    }
    type NavigationItems implements Node {
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
    type SiteMapHeaderYaml implements Node {
        headers: [Header] @headers
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
exports.onCreateDevServer=({app})=>{

    app.use(express.static("public"))
};
