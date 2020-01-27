import {useStaticQuery, graphql} from 'gatsby';

export const CarouselStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query CarouselStaticQuery {
          allMarkdownRemark(filter: {fields: {carousel: {active: {eq: true}}}}) {
            edges {
              node {
                fields {
                  carousel {
                    active
                    blurb
                    docType
                    title
                    url
                  }
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
