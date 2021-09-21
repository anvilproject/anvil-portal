/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL configuration file.
 */

let contentPath = "./content";
let yamlPath = "./content";
let roadMapPath = "./content/roadmap/";

let gtmId = process.env.GATSBY_GTM_ID;
let gtmAuth = process.env.GATSBY_GTM_AUTH;
let gtmEnvName = process.env.GATSBY_ENV_NAME;

module.exports = {
  siteMetadata: {
    title: "The AnVIL",
    description:
      "Analyze large, open & controlled-access genomic datasets with familiar tools and reproducible workflows in a secure cloud-based execution environment.",
    author: "The AnVIL team",
    siteUrl: "https://anvilproject.org",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-catch-links",
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
      resolve: "gatsby-plugin-manifest",
      options: {
        background_color: "#f6f7f4",
        display: "standalone",
        icon: "./images/favicon-anvil.png",
        name: "AnVIL",
        short_name: "AnVIL",
        start_url: "/",
        theme_color: "#035c94",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-robots-txt",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: [
          "/events/events-intro",
          "/news/news-intro",
          "/guides/content-guide/example-page",
          "/typography-test-page/typography-test-page",
        ],
      },
    },
    // "gatsby-plugin-workspace-fields-report",
    "gatsby-source-dashboard-anvil",
    "gatsby-source-dashboard-ncpi",
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown-pages",
        path: contentPath,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "site-map",
        path: yamlPath,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "road-map",
        path: roadMapPath,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-component",
          {
            resolve: "gatsby-remark-component-parent2div",
            options: {
              components: [
                "button",
                "button-link",
                "dashboard-anvil",
                "dashboard-ncpi",
                "event-hero",
                "events",
                "external-link",
                "figure",
                "figure-caption",
                "figure-styles",
                "hero",
                "hero-tutorial",
                "internal-link",
                "news",
                "platforms",
                "site-search",
                "socials",
                "social-link",
                "social-twitter",
                "social-twitter-handle",
                "social-twitter-hashtag",
                "social-youtube",
                "style-guide-color-palette",
                "style-guide-download-logo",
                "style-guide-typography",
                "style-guide-typography-example",
                "tools",
                "warning",
                "workspaces",
              ],
            },
          },
          {
            // Copies downloadable images and pdfs etc to a directory where they can be downloaded.
            // Used specifically to easily download an image or file e.g. the AnVIL poster presented at #T2THPRC.
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              // Skip markdown files and images so they can be handled by gatsby-remark-images.
              ignoreFileExtensions: [
                "bmp",
                "jpg",
                "jpeg",
                "md",
                "mdx",
                "png",
                "tiff",
              ],
            },
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 600,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: (videoId) =>
                    `https://www.youtube.com/embed/${videoId}?enablejsapi=1`,
                },
              ],
            },
          },
          `gatsby-remark-external-links`,
          `gatsby-remark-responsive-iframe`, // Required for resizing embedded videos.
          {
            resolve: "gatsby-remark-images",
            options: {
              linkImagesToOriginal: false,
              maxWidth: 1000,
            },
          },
          "gatsby-remark-images-medium-zoom",
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
            },
          },
          "gatsby-remark-autointernallink-headers",
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-transformer-yaml",
  ],
};
