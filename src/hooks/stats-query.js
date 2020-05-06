import {useStaticQuery, graphql} from 'gatsby';

export const StatsStaticQuery = () => {
    const {allFiguresJson} = useStaticQuery(
        graphql`
        query StatsStaticQuery {
            allFiguresJson {
                edges {
                  node {
                    projects {
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
