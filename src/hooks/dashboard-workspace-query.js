import {useStaticQuery, graphql} from 'gatsby';

export const DashboardWorkspaceStaticQuery = () => {
    const {allWorkspace} = useStaticQuery(
        graphql`
        query DashboardWorkspaceStaticQuery {
          allWorkspace {
            edges {
              node {
                access
                accessType
                consortium
                dataTypes
                dbGapId
                dbGapIdAccession
                demographics
                diagnosis
                diseases
                families
                files
                gapId {
                  studyUrl
                  gapIdDisplay
                }
                projectId
                samples
                size
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
