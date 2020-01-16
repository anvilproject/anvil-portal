import {useStaticQuery, graphql} from 'gatsby';

export const eventsStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query EventsStaticQuery {
          allMarkdownRemark(filter: {fields: {slug: {regex: "/events/", nin: "/events/events"}}}, sort: {fields: [frontmatter___date], order: DESC}) {
            edges {
              node {
                fields {
                   slug
                }
                frontmatter {
                   date(formatString: "DD MMMM YYYY")
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
