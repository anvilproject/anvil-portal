import {useStaticQuery, graphql} from 'gatsby';

export const ScoopNewsStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query ScoopNewsStaticQuery {
          allMarkdownRemark(filter: {fields: {slug: {regex: "/news/", ne: "/news/news"}}, pageCreated: {eq: true}}, sort: {fields: [frontmatter___date], order: DESC}) {
            edges {
              node {
                fields {
                   slug
                }
                frontmatter {
                   date(formatString: "MMMM DD, YYYY")
                   description
                   featured
                   title
                }
                htmlAst
                pageCreated
              }
            }
          }
        }
    `
    );
    return allMarkdownRemark.edges
        .map(e => e.node)
        .map(n => n)
        .filter(n => n.fields.slug.startsWith("/news/"));
};
