// Core dependencies
import { useStaticQuery, graphql } from "gatsby";

export const UpdateCloudStaticQuery = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query UpdateCloudStaticQuery {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "/update-cloud/" } } }
        ) {
          nodes {
            frontmatter {
              sectionSubHeader
            }
          }
        }
      }
    `
  );
  return allMarkdownRemark.nodes[0].frontmatter;
};
