import {useStaticQuery, graphql} from 'gatsby';

export const ScoopEventStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query ScoopEventStaticQuery {
          allMarkdownRemark(filter: {fields: {slug: {regex: "/events/", nin: "/events/events"}, privateEvent: {eq: false}}, pageCreated: {eq: true}}, sort: {fields: [frontmatter___dateStart], order: ASC}) {
            edges {
              node {
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
                pageCreated
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
