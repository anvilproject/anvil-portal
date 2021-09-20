import { useStaticQuery, graphql } from "gatsby";

export const PlatformsStaticQuery = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query PlatformsStaticQuery {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "/set-of-platforms/" } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                logo {
                  childImageSharp {
                    gatsbyImageData(placeholder: NONE)
                  }
                }
                title
                url
              }
              htmlAst
            }
          }
        }
      }
    `
  );
  return allMarkdownRemark.edges.map((e) => e.node).map((n) => n);
};
