import {useStaticQuery, graphql} from 'gatsby';

export const RoadMapStaticQuery = () => {
    const {allReleaseRoadmapYaml} = useStaticQuery(
        graphql`
        query RoadMapStaticQuery {
            allReleaseRoadmapYaml {
                edges {
                  node {
                    quarter
                    display {
                      tools {
                        link
                        name
                      }
                      platforms {
                        link
                        name
                      }
                    }
                  }
                }
            }
        }
    `
    );
    return allReleaseRoadmapYaml.edges.map(n => n.node);
};
