import {useStaticQuery, graphql} from 'gatsby';

export const HeaderStaticQuery = () => {
    const {allSiteMapHeaderYaml} = useStaticQuery(
        graphql`
        query HeaderStaticQuery {
          allSiteMapHeaderYaml {
            edges {
              node {
                headers {
                  name
                  path
                }
              }
            }
          }
        }
    `
    );
    return allSiteMapHeaderYaml.edges.find(e => e.node).node.headers;
};
