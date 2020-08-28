/**
 * The AnVIL
 * https://www.anvilproject.org
 */

const express = require('express');
const {fmImagesToRelative} = require('gatsby-remark-relative-images');
const {createFilePath} = require(`gatsby-source-filesystem`);
const path = require(`path`);
const {buildDateBubbleField, buildDateStartField, buildSessionsDisplayField} = require("./src/utils/node/schema-customization.service");

// Replacing '/' would result in empty string which is invalid
const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``));

// Returns document path or key.
function getKeyOrPath(key, siteMapPathOrKey) {

    const path = siteMapPathOrKey.get(key);

    if (path) {
        return path;
    }
    else {
        return key
    }
}

// sections -> primary docs -> secondary docs
function keyToPath(siteMap) {
    return siteMap.reduce((acc, section) => {
        if (section.primaryLinks) {
            return section.primaryLinks.reduce((acc, pLink) => {
                addToMap(acc, pLink);
                if (pLink.secondaryLinks) {
                    pLink.secondaryLinks.forEach(sLink => addToMap(acc, sLink));
                }
                return acc;
            }, acc);
        }
        return acc;
    }, new Map());
}

function addToMap(acc, doc) {

    if (doc.path) {
        acc.set(doc.key, doc.path);
    } else {
        acc.set(doc.key, doc.key);
    }
}

exports.onCreateNode = ({node, getNode, actions}) => {
    const {createNodeField} = actions;
    fmImagesToRelative(node);
    if (node.internal.type === `MarkdownRemark`) {

        const {frontmatter} = node,
            {draft, pageAlignment, privateEvent} = frontmatter || {};
        const nodeValueDraft = draft ? draft : false;
        const nodeValuePrivateEvent = privateEvent ? privateEvent : false;
        const nodeValueSlug = createFilePath({node, getNode, basePath: `pages`});
        const nodeValueStyles = {alignment: pageAlignment};

        createNodeField({
            node,
            name: `draft`,
            value: nodeValueDraft,
        });
        createNodeField({
            node,
            name: `privateEvent`,
            value: nodeValuePrivateEvent,
        });
        createNodeField({
            node,
            name: `slug`,
            value: replacePath(nodeValueSlug),
        });
        createNodeField({
            node,
            name: `styles`,
            value: nodeValueStyles,
        });
    }
};

exports.createPages = ({graphql, actions}) => {
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
            name
            key
            path
            primaryLinks {
              name
              key
              path
              secondaryLinks {
                name
                key
                path
              }
            }
          }
        }
      }
    }
  `).then(result => {

        // if there is an error return
        if (result.errors) {
            return Promise.reject(result.errors);
        }

        // get siteMap
        let yamlSiteMap = result.data.allSiteMapYaml.edges.map(n => n.node);

        let yamlSiteMapPathOrKey = keyToPath(yamlSiteMap);

        result.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: getKeyOrPath(node.fields.slug, yamlSiteMapPathOrKey),
                component: path.resolve(`./src/templates/content-template.js`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    draft: node.fields.draft,
                    slug: node.fields.slug
                },
            });
        });
    });
};

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
    type MarkdownRemark implements Node {
        frontmatter: Frontmatter
    }
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
    type Session {
        sessionEnd: String
        sessionStart: String
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

    app.use(express.static('public'))
};
