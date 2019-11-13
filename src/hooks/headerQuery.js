import {useStaticQuery, graphql} from 'gatsby';

export const headerStaticQuery = () => {
    const {allSiteMapYaml} = useStaticQuery(
        graphql`
        query HeaderStaticQuery {
          allSiteMapYaml(filter: {position: {location: {eq: "h"}}}, sort: {fields: [position___order], order: ASC}) {
            edges {
              node {
                name
                path
                position {
                    location
                    order
                }
              }
            }
          }
        }
    `
    );
    return allSiteMapYaml.edges.map(e => e.node);
};
