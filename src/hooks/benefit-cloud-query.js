// Core dependencies
import { useStaticQuery, graphql } from "gatsby";

export const BenefitCloudStaticQuery = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query BenefitCloudStaticQuery {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "/benefit-cloud/" } } }
        ) {
          nodes {
            frontmatter {
              benefits {
                text
                title
              }
            }
          }
        }
      }
    `
  );
  return allMarkdownRemark.nodes[0].frontmatter.benefits;
};
