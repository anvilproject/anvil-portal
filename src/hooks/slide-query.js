// Core dependencies
import { useStaticQuery, graphql } from "gatsby";

export const SlideStaticQuery = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query SlideStaticQuery {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "/carousel/" } } }
        ) {
          nodes {
            frontmatter {
              slides {
                media {
                  childImageSharp {
                    gatsbyImageData(width: 168)
                  }
                }
                subTitle
                title
              }
            }
          }
        }
      }
    `
  );
  return allMarkdownRemark.nodes[0].frontmatter.slides;
};
