import {useStaticQuery, graphql} from 'gatsby';

export const DashboardDetailStaticQuery = () => {
    const {allDashboardSchemaJson} = useStaticQuery(
        graphql`
        query DashboardDetailStaticQuery {
          allDashboardSchemaJson {
            edges {
              node {
                workspaces {
                  access
                  dataType
                  dbGapId
                  dbGapIdAccession
                  demographics
                  diagnosis
                  families
                  files
                  program
                  projectId
                  samples
                  size
                  sizeTB
                  subjects
                }
              }
            }
          }
        }
    `
    );
    return allDashboardSchemaJson.edges.find(n => n.node).node.workspaces;
};
