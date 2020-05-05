import {useStaticQuery, graphql} from 'gatsby';

export const DashboardStaticQuery = () => {
    const {allFiguresJson} = useStaticQuery(
        graphql`
        query DashboardStaticQuery {
            allFiguresJson {
                edges {
                  node {
                    projects {
                      data_type
                      files {
                        count
                        size
                        type
                      }
                      dbGAP_project_id
                      nodes {
                        count
                        type
                      }
                      project_id
                      public
                      size
                      source
                    }
                  }
                }
            }
        }
    `
    );
    return allFiguresJson.edges.map(n => n.node)[0];
};
