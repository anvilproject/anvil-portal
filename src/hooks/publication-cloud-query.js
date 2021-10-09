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
                citation
                title
              }
            }
          }
        }
        file(relativePath: { regex: "/publications.png/" }) {
          childImageSharp {
            gatsbyImageData(placeholder: NONE, width: 160)
          }
        }
      }
    `
  );
  return [allMarkdownRemark.nodes[0].frontmatter.publications, file];
};
