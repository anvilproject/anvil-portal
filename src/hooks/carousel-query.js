import {useStaticQuery, graphql} from 'gatsby';

export const CarouselStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query CarouselStaticQuery {
          allMarkdownRemark(filter: {denied: {eq: false}, frontmatter: {carousel: {eq: true}}}) {
            edges {
              node {
                denied
                fields {
                  slug
                }
                frontmatter {
                  description
                  docType
                  logo {
                    childImageSharp {
                      fluid {
                        src
                      }
                    }
                  }
                  title
                  url
                }
              }
            }
          }
        }
    `
    );
    return allMarkdownRemark.edges.map(e => e.node);
};
