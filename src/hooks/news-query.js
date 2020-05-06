import {useStaticQuery, graphql} from 'gatsby';

export const NewsStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query NewsStaticQuery {
          allMarkdownRemark(filter: {fields: {slug: {regex: "/news/"}}}, sort: {fields: [frontmatter___date], order: DESC}) {
            edges {
              node {
                fields {
                   slug
                }
                frontmatter {
                   date(formatString: "DD MMMM YYYY")
                   description
                   featured
                   title
                }
                htmlAst
              }
            }
          }
        }
    `
    );
    return allMarkdownRemark.edges.map(e => e.node).map(n => n);
};
