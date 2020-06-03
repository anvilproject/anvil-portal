import {useStaticQuery, graphql} from 'gatsby';

export const DashboardSubjectReportStaticQuery = () => {
    const {allSubjectReportSchema} = useStaticQuery(
        graphql`
        query DashboardSubjectReportStaticQuery {
            allSubjectReportSchema(sort: {fields: dbGapIdAccession, order: ASC}) {
              edges {
                node {
                  dbGapIdAccession
                  name
                  variables {
                    consents {
                      consentName
                      consentStat
                    }
                    consentsId
                    consentsStat
                  }
                }
              }
            }
        }
    `
    );
    return allSubjectReportSchema.edges.map(n => n.node);
};
