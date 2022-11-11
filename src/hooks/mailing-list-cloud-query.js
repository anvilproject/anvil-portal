// Core dependencies
import { useStaticQuery, graphql } from "gatsby";

export const MailingListCloudStaticQuery = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query MailingListCloudStaticQuery {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "/mailing-list-cloud/" } } }
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
