// Core dependencies
import { useStaticQuery, graphql } from "gatsby";

export const TechCloudStaticQuery = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query TechCloudStaticQuery {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "/tech-cloud/" } } }
        ) {
          nodes {
            frontmatter {
              technologies {
                actions {
                  label
                  url
                }
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
  return allMarkdownRemark.nodes[0].frontmatter.technologies;
};
