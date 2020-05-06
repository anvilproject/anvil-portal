import {useStaticQuery, graphql} from 'gatsby';

export const SubmittingStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query SubmittingStaticQuery {
          allMarkdownRemark(filter: {fields: {slug: {regex: "/submitting-data/submitting-data-intro/"}}}) {
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
