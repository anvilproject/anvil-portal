import {useStaticQuery, graphql} from 'gatsby';

export const DashboardNCPIStaticQuery = () => {
    const {allDashboardNcpi} = useStaticQuery(
        graphql`
        query DashboardNCPIStaticQuery {
          allDashboardNcpi {
            edges {
              node {
                consentCodes {
                  displayValue
                  tooltipValue
                }
                consentShortNames
                dataTypes
                dbGapIdAccession
                diseases
                gapId {
                  studyUrl
                  gapIdDisplay
                }
                platform
                studyName
                subjectsTotal
              }
            }
          }
        }
    `
    );
    return allDashboardNcpi.edges.map(n => n.node);
};
