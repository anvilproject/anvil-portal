const path = require(`path`);
const {createFilePath} = require(`gatsby-source-filesystem`);

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
    if (node.internal.type === `MarkdownRemark`) {
        const carousel = node.frontmatter.carousel ? node.frontmatter.carousel : {active: false, blurb: "", docType: "", title: "", url: ""};
        const draft = node.frontmatter.draft ? node.frontmatter.draft : false;
        const slug = createFilePath({node, getNode, basePath: `pages`});
        createNodeField({
            node,
            name: `carousel`,
            value: carousel,
        }),
        createNodeField({
            node,
            name: `draft`,
            value: draft,
        }),
        createNodeField({
            node,
            name: `slug`,
            value: replacePath(slug),
        })
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
              carousel {
                active
                blurb
                docType
                title
                url
              }
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
                component: path.resolve(`./src/templates/contentTemplate.js`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    carousel: node.fields.carousel,
                    draft: node.fields.draft,
                    slug: node.fields.slug
                },
            });
        });
    });
};
