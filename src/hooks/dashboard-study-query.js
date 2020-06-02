import {useStaticQuery, graphql} from 'gatsby';

export const DashboardStudyStaticQuery = () => {
    const {allStudySchema} = useStaticQuery(
        graphql`
        query DashboardStudyStaticQuery {
            allStudySchema(sort: {fields: dbGapId, order: ASC}) {
              edges {
                node {
                  dbGapId
                  consentGroups {
                    longName
                    shortName
                  }
                  diseases
                  name {
                    longName
                    shortName
                   }
                }
              }
            }
        }
    `
    );
    return allStudySchema.edges.map(n => n.node);
};
