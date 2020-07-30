import {useStaticQuery, graphql} from 'gatsby';

export const DashboardWorkspaceStaticQuery = () => {
    const {allWorkspace} = useStaticQuery(
        graphql`
        query DashboardWorkspaceStaticQuery {
          allWorkspace {
            edges {
              node {
                access
                accessUI
                dataType
                dbGapId
                dbGapIdAccession
                demographics
                diagnosis
                diseases
                families
                files
                program
                projectId
                samples
                size
                sizeTB
                studyName
                subjects
              }
            }
          }
        }
    `
    );
    return allWorkspace.edges.map(n => n.node);
};
