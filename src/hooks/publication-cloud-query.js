// Core dependencies
import { useStaticQuery, graphql } from "gatsby";

export const PublicationCloudStaticQuery = () => {
  const { allMarkdownRemark, file } = useStaticQuery(
    graphql`
      query PublicationCloudStaticQuery {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "/publication-cloud/" } } }
        ) {
          nodes {
            frontmatter {
              publications {
                cardLink
                citation {
                  authors
                  doi
                  journal
                  publisher
                  year
                }
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
