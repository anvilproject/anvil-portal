import {useStaticQuery, graphql} from 'gatsby';

export const DashboardStudyStaticQuery = () => {
    const {allStudySchema} = useStaticQuery(
        graphql`
        query DashboardStudyStaticQuery {
            allStudySchema(sort: {fields: dbGapIdAccession, order: ASC}) {
              edges {
                node {
                  dbGapIdAccession
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
