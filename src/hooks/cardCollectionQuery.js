import {useStaticQuery, graphql} from 'gatsby';

export const CardCollectionStaticQuery = () => {
    const {allCardCollectionYaml} = useStaticQuery(
        graphql`
        query CardCollectionStaticQuery {
            allCardCollectionYaml {
                edges {
                  node {
                      platforms {
                        logo {
                          childImageSharp {
                            fluid {
                              src
                            }
                          }
                        }
                        path {
                          childMarkdownRemark {
                            htmlAst
                          }
                        }
                        title
                        url
                      }
                      tools {
                        coming {
                          logo {
                            childImageSharp {
                              fluid {
                                src
                              }
                            }
                          }
                          path {
                            childMarkdownRemark {
                              htmlAst
                            }
                          }
                          title
                          url
                        }
                        current {
                          logo {
                            childImageSharp {
                              fluid {
                                src
                              }
                            }
                          }
                          path {
                            childMarkdownRemark {
                              htmlAst
                            }
                          }
                          title
                          url
                        }
                      }
                  }
                }
            }
        }
    `
    );
    return allCardCollectionYaml.edges.find(n => n.node).node;
};
