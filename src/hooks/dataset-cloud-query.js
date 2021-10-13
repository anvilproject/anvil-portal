// Core dependencies
import { useStaticQuery, graphql } from "gatsby";

export const DatasetCloudStaticQuery = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query DatasetCloudStaticQuery {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "/dataset-cloud/" } } }
        ) {
          nodes {
            frontmatter {
              datasets {
                actions {
                  label
                  url
                }
                subTitle
                title
              }
              sectionSubHeader
            }
          }
        }
      }
    `
  );
  return allMarkdownRemark.nodes[0].frontmatter;
};
