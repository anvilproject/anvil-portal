import { useStaticQuery, graphql } from "gatsby";

export const StatsStaticQuery = () => {
  const { allStat } = useStaticQuery(
    graphql`
      query StatsStaticQuery {
        allStat {
          edges {
            node {
              cohorts
              consortia
              samples
              size
              subjects
            }
          }
        }
      }
    `
  );
  return allStat.edges.map(n => n.node)[0];
};
