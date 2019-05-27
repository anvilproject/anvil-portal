module.exports = {
    siteMetadata: {
        title: `The AnVIL`,
        description: `Inverting the model of genomic data sharing`,
        author: `The AnVIL team`,
    },
    plugins: [
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
                path: `${__dirname}/content`,
            },
        },
        `gatsby-transformer-sharp`,
    ],
};
