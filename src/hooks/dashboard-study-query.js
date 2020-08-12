import {useStaticQuery, graphql} from 'gatsby';

export const DashboardStudyStaticQuery = () => {
    const {allStudy} = useStaticQuery(
        graphql`
        query DashboardStudyStaticQuery {
          allStudy {
            edges {
              node {
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
                consortium
                dbGapIdAccession
                diseases
                studyName
                subjectsCount
                subjectsTotal
                workspaces {
                  access
                  dataTypes
                  files
                  projectId
                  samples
                  size
                  subjects
                }
              }
            }
          }
        }
    `
    );
    return allStudy.edges.map(n => n.node);
};
