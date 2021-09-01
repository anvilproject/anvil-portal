import { useStaticQuery, graphql } from "gatsby";

export const DashboardNCPIStaticQuery = () => {
  const { allDashboardNcpi } = useStaticQuery(
    graphql`
      query DashboardNCPIStaticQuery {
        allDashboardNcpi {
          edges {
            node {
              consentCodes
              dataTypes
              dbGapIdAccession
              focuses
              gapId {
                studyUrl
                gapIdDisplay
              }
              platform
              platforms
              studyDesigns
              studyName
              studySlug
              subjectsTotal
            }
          }
        }
      }
    `
  );
  return allDashboardNcpi.edges.map((n) => n.node);
};
