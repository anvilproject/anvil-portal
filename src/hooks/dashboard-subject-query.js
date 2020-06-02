import {useStaticQuery, graphql} from 'gatsby';

export const DashboardSubjectStaticQuery = () => {
    const {allSubjectSchema} = useStaticQuery(
        graphql`
        query DashboardSubjectStaticQuery {
            allSubjectSchema(sort: {fields: dbGapId, order: ASC}) {
              edges {
                node {
                  dbGapId
                  consentGroups {
                    consentName
                    consentStat
                  }
                  count
                  name
                }
              }
            }
        }
    `
    );
    return allSubjectSchema.edges.map(n => n.node);
};
