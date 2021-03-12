import {useStaticQuery, graphql} from 'gatsby';

export const DashboardIngestedWorkspaceStaticQuery = () => {
    const {allIngestedWorkspace} = useStaticQuery(
        graphql`
        query DashboardIngestedWorkspaceStaticQuery {
          allIngestedWorkspace {
            edges {
              node {
                accessType
                consentShortNames
                consortium
                dataTypes
                dbGapId
                diseases
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
    return allIngestedWorkspace.edges.map(n => n.node);
};
