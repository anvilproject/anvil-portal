import {useStaticQuery, graphql} from 'gatsby';

export const DashboardSubjectDictionaryStaticQuery = () => {
    const {allSubjectDictionarySchema} = useStaticQuery(
        graphql`
        query DashboardSubjectDictionaryStaticQuery {
            allSubjectDictionarySchema(sort: {fields: dbGapIdAccession, order: ASC}) {
              edges {
                node {
                  dbGapIdAccession
                  variableConsentId
                }
              }
            }
        }
    `
    );
    return allSubjectDictionarySchema.edges.map(n => n.node);
};
