import {useStaticQuery, graphql} from "gatsby";

export const SectionIntroStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query SectionIntroStaticQuery {
          allMarkdownRemark(filter: {fields: {slug: {regex: "/^/section-intro/"}}}) {
            edges {
              node {
                fields {
                  slug
                }
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
    return allMarkdownRemark.edges.map(e => e.node);
};
