import {useStaticQuery, graphql} from "gatsby";

export const WorkspacesStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query WorkspacesStaticQuery {
            allMarkdownRemark(filter: {fields: {slug: {regex: "/^/workspaces/"}}}) {
                edges {
                    node {
                        frontmatter {
                            description
                            featured
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
