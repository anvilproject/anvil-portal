// Core dependencies
import { useStaticQuery, graphql } from "gatsby";

// App dependencies
import { filterScoopsByDate } from "../utils/scoops.service";

export const EventCloudStaticQuery = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query EventCloudStaticQuery {
        allMarkdownRemark(
          filter: {
            fields: { slug: { regex: "/events/" }, privateEvent: { eq: false } }
            frontmatter: { featured: { eq: true } }
            pageCreated: { eq: true }
          }
          sort: { fields: [frontmatter___dateStart], order: ASC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                dateBubble
                dateStart
                title
              }
            }
          }
        }
      }
    `
  );
  const allEvents = allMarkdownRemark.edges.map((n) => n.node);
  const allFutureEvents = filterScoopsByDate(allEvents, false);
  return allFutureEvents.map((item) => {
    return {
      dateBubble: item.frontmatter.dateBubble,
      link: item.fields.slug,
      title: item.frontmatter.title,
    };
  });
};
