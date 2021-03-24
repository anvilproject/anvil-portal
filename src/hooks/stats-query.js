import {useStaticQuery, graphql} from 'gatsby';

export const StatsStaticQuery = () => {
    const {allWorkspace} = useStaticQuery(
        graphql`
        query StatsStaticQuery {
            allWorkspace {
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
    return allWorkspace.edges.map(n => n.node);
};
