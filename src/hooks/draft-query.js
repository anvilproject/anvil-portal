import {useStaticQuery, graphql} from 'gatsby';

export const DraftStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query DraftStaticQuery {
          allMarkdownRemark(filter: {fields: {draft: {eq: true}}}) {
            edges {
              node {
                fields {
                   slug
                }
              }
            }
          }
        }
    `
    );
    return allMarkdownRemark.edges.map(e => e.node).map(n => n.fields);
};
