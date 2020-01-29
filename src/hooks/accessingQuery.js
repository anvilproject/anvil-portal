import {useStaticQuery, graphql} from 'gatsby';

export const AccessingStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query AccessingStaticQuery {
          allMarkdownRemark(filter: {fields: {slug: {regex: "/accessing-data/accessing-data-intro/"}}}) {
            edges {
              node {
                frontmatter {
                  title
                }
                htmlAst
              }
            }
          }
        }
    `
    );
    return allMarkdownRemark.edges.map(e => e.node).find(n => n);
};
