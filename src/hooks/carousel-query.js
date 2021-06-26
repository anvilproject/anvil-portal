import { useStaticQuery, graphql } from "gatsby";

export const CarouselStaticQuery = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query CarouselStaticQuery {
        allMarkdownRemark(
          filter: {
            frontmatter: { carousel: { eq: true } }
            pageCreated: { eq: true }
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                description
                docType
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
              pageCreated
            }
          }
        }
      }
    `
  );
  return allMarkdownRemark.edges.map(e => e.node);
};
