import {useStaticQuery, graphql} from 'gatsby';

export const ToolsStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query ToolsStaticQuery {
          allMarkdownRemark(filter: {fields: {slug: {regex: "/set-of-tools/"}}}) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  logo {
                    childImageSharp {
                      fluid {
                        src
                      }
                    }
                  }
                  title
                  url
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
