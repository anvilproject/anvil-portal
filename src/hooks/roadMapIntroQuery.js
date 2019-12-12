import {useStaticQuery, graphql} from 'gatsby';

export const roadMapIntroStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query RoadMapIntroStaticQuery {
          allMarkdownRemark(filter: {fields: {slug: {regex: "/roadmap/roadmap-intro/"}}}) {
            edges {
              node {
                htmlAst
              }
            }
          }
        }
    `
    );
    return allMarkdownRemark.edges.map(e => e.node).find(n => n);
};
