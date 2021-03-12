import {useStaticQuery, graphql} from 'gatsby';

export const StatsStaticQuery = () => {
    const {allIngestedWorkspace} = useStaticQuery(
        graphql`
        query StatsStaticQuery {
            allIngestedWorkspace {
              edges {
                node {
                  consortium
                  projectId
                  samples
                  size
                  subjects
                }
              }
            }
        }
    `
    );
    return allIngestedWorkspace.edges.map(n => n.node);
};
