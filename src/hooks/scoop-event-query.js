import {useStaticQuery, graphql} from 'gatsby';

export const ScoopEventStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query ScoopEventStaticQuery {
          allMarkdownRemark(filter: {denied: {eq: false}, fields: {slug: {regex: "/events/", nin: "/events/events"}, privateEvent: {eq: false}}}, sort: {fields: [frontmatter___dateStart], order: ASC}) {
            edges {
              node {
                denied
                fields {
                  slug
                }
                frontmatter {
                  conference
                  dateBubble
                  dateStart
                  description
                  eventType
                  featured
                  title
                }
                htmlAst
              }
            }
          }
        }
    `
    );
    return allMarkdownRemark.edges
        .map(e => e.node)
        .map(n => n)
        .filter(n => n.fields.slug.startsWith("/events/"));
};
