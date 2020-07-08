import {useStaticQuery, graphql} from 'gatsby';

export const DashboardStudyStaticQuery = () => {
    const {allDashboardSchemaJson} = useStaticQuery(
        graphql`
        query DashboardStudyStaticQuery {
          allDashboardSchemaJson {
            edges {
              node {
                studies {
                  access
                  consentGroup {
                    consents {
                      consentCode
                      consentLongName
                      consentName
                      consentShortName
                      consentStat
                    }
                    consentsStat
                  }
                  consortia
                  dbGapIdAccession
                  diseases
                  studyName
                  subjectsCount
                  subjectsTotal
                  workspaces {
                    dataType
                    files
                    samples
                    size
                    subjects
                    workspaceId
                  }
                }
              }
            }
          }
        }
    `
    );
    return allDashboardSchemaJson.edges.find(n => n.node).node.studies;
};
