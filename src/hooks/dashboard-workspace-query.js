import {useStaticQuery, graphql} from 'gatsby';

export const DashboardWorkspaceStaticQuery = () => {
    const {allWorkspace} = useStaticQuery(
        graphql`
        query DashboardWorkspaceStaticQuery {
          allWorkspace {
            edges {
              node {
                access
                dataType
                dbGapId
                dbGapIdAccession
                demographics
                diagnosis
                families
                files
                program
                projectId
                samples
                size
                sizeTB
                subjects
              }
            }
          }
        }
    `
    );
    return allWorkspace.edges.map(n => n.node);
};
