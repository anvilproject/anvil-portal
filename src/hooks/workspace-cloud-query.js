// Core dependencies
import { useStaticQuery, graphql } from "gatsby";

export const WorkspaceCloudStaticQuery = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query WorkspaceCloudStaticQuery {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "/workspace-cloud/" } } }
        ) {
          nodes {
            frontmatter {
              workspaces {
                cardLink
                text
                thumbnail {
                  childImageSharp {
                    gatsbyImageData(placeholder: NONE, width: 40)
                  }
                }
                title
              }
            }
          }
        }
      }
    `
  );
  return allMarkdownRemark.nodes[0].frontmatter.workspaces;
};
