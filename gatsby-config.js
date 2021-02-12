/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL configuration file.
 */

let statsJsonPath = `../client-apis/pyAnVIL/notebooks/figures/report-data.json`;
let contentPath = `./content`;
let yamlPath = `./content`;
let roadMapPath = `./content/roadmap/`;

let gtmId = process.env.GATSBY_GTM_ID;
let gtmAuth = process.env.GATSBY_GTM_AUTH;
let gtmEnvName = process.env.GATSBY_ENV_NAME;

module.exports = {
    siteMetadata: {
        title: `The AnVIL`,
        description: `Analyze large, open & controlled-access genomic datasets with familiar tools and reproducible workflows in a secure cloud-based execution environment.`,
        author: `The AnVIL team`,
        siteUrl: `https://anvilproject.org`,
    },
    plugins: [
        `gatsby-plugin-catch-links`,
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                id: gtmId,

                // Include GTM in development.
                // Defaults to false meaning GTM will only be loaded in production.
                includeInDevelopment: false,

                // datalayer to be set before GTM is loaded
                // should be an object or a function that is executed in the browser
                // Defaults to null
                defaultDataLayer: {},

                // Specify optional GTM environment details.
                gtmAuth: gtmAuth,
                gtmPreview: gtmEnvName,
            },
        },
        {
            resolve: `gatsby-plugin-favicon`,
            options: {
                logo: "./images/favicon-anvil.png",

                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    coast: false,
                    favicons: true,
                    firefox: true,
                    yandex: false,
                    windows: false
                }
            }
        },
        `gatsby-plugin-manifest`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-robots-txt`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                exclude: [`/events/events-intro`, `/news/news-intro`, `/guides/content-guide/example-page`, `/typography-test-page/typography-test-page`],
            }
        },
        // `gatsby-plugin-workspace-fields-report`,
        `gatsby-source-studies`,
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: statsJsonPath,
                name: 'json-schema',
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `markdown-pages`,
                path: contentPath,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `site-map`,
                path: yamlPath,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `road-map`,
                path: roadMapPath,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-autolink-headers`,
                        options: {
                            offsetY: `152`,
                            className: `anchor`,
                        }
                    },
                    `gatsby-remark-component`,
                    {
                        resolve: `gatsby-remark-component-parent2div`,
                        options: {
                            components: [
                                "data-dashboard",
                                "event-hero",
                                "events",
                                "external-link",
                                "figure",
                                "figure-caption",
                                "hero",
                                "news",
                                "platforms",
                                "site-search",
                                "style-guide-color-palette",
                                "style-guide-download-logo",
                                "style-guide-typography",
                                "style-guide-typography-example",
                                "tools",
                                "warning",
                                "workspaces"]
                        }
                    },
                    {
                        resolve: `gatsby-remark-copy-linked-files`,
                        options: {
                            // don't copy linked markdown files but do the normal skipping of images so they can be handled by gatsby-remark-images
                            ignoreFileExtensions: ['png', 'jpg', 'jpeg', 'bmp', 'tiff', 'md'],
                        }
                    },
                    {
                        resolve: `gatsby-remark-embed-video`,
                        options: {
                            width: 600,
                            ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
                            related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
                            noIframeBorder: true //Optional: Disable insertion of <style> border: 0
                        }
                    },
                    `gatsby-remark-external-links`,
                    `gatsby-remark-responsive-iframe`,
                    `gatsby-remark-relative-images`,
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            linkImagesToOriginal: false,
                            maxWidth: 1000
                        }
                    },
                    `gatsby-remark-images-medium-zoom`,
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: "language-",
                        },
                    },
                ]
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-transformer-yaml`
    ],
};
