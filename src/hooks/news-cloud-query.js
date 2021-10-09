// Core dependencies
import { useStaticQuery, graphql } from "gatsby";

export const NewsCloudStaticQuery = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query NewsCloudStaticQuery {
        allMarkdownRemark(
          filter: {
            fields: { slug: { regex: "/news/" } }
            frontmatter: { featured: { eq: true } }
            pageCreated: { eq: true }
          }
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                date(formatString: "MMM DD, YYYY")
                title
              }
            }
          }
        }
      }
    `
  );
  return allMarkdownRemark.edges
    .map((n) => n.node)
    .map((item) => {
      return {
        date: item.frontmatter.date,
        link: item.fields.slug,
        title: item.frontmatter.title,
      };
    });
};
