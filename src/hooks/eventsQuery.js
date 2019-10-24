import {useStaticQuery, graphql} from 'gatsby';

export const eventsStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query EventsStaticQuery {
          allMarkdownRemark(filter: {fields: {slug: {regex: "/events/"}}}) {
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
                html
              }
            }
          }
        }
    `
    );
    return allMarkdownRemark.edges.map(e => e.node).map(n => n);
};
