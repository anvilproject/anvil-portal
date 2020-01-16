/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL configuration file.
 */

let contentPath = `./content`;
let roadMapPath = `./content/roadmap/`;
let yamlPath = `./content`;

module.exports = {
    siteMetadata: {
        title: `The AnVIL`,
        description: `Inverting the model of genomic data sharing`,
        author: `The AnVIL team`,
    },
    plugins: [
        {
            resolve: `gatsby-plugin-favicon`,
            options: {
                logo: "./images/favicon.png",

                // WebApp Manifest Configuration
                appName: null, // Inferred with your package.json
                appDescription: null,
                developerName: null,
                developerURL: null,
                dir: 'auto',
                lang: 'en-US',
                background: '#fff',
                theme_color: '#fff',
                display: 'standalone',
                orientation: 'any',
                start_url: '/?homescreen=1',
                version: '1.0',

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
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
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
                            offsetY: `100`,
                            className: `anchor`,
                        }
                    },
                    `gatsby-remark-component`,
                    {
                        resolve: `gatsby-remark-component-parent2div`,
                        options: {
                            components: ["button", "events", "inscription", "hero"]
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
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 600,
                            linkImagesToOriginal: false,
                            wrapperStyle: `margin: 0 !important;`,
                        }
                    },
                ]
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-transformer-yaml`,
    ],
};
