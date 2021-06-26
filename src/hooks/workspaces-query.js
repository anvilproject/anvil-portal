import { useStaticQuery, graphql } from "gatsby";

export const WorkspacesStaticQuery = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query WorkspacesStaticQuery {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "/^/workspaces/" } } }
        ) {
          edges {
            node {
              frontmatter {
                featured
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
  return allMarkdownRemark.edges.map(e => e.node);
};
