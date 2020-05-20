import {useStaticQuery, graphql} from 'gatsby';

export const EventsStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query EventsStaticQuery {
          allMarkdownRemark(filter: {fields: {slug: {regex: "/events/", nin: "/events/events"}}}, sort: {fields: [frontmatter___date], order: ASC}) {
            edges {
              node {
                fields {
                   slug
                }
                frontmatter {
                   date(formatString: "MMMM DD, YYYY")
                   description
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
    return allMarkdownRemark.edges.map(e => e.node).map(n => n);
};
