import { useStaticQuery, graphql } from "gatsby";

export const DashboardWorkspaceStaticQuery = () => {
  const { allWorkspace } = useStaticQuery(
    graphql`
      query DashboardWorkspaceStaticQuery {
        allWorkspace {
          edges {
            node {
              accessType
              consentShortName
              consortium
              createdAt
              dataTypes
              dbGapId
              diseases
              gapId {
                studyUrl
                gapIdDisplay
              }
              projectId
              samples
              size
              studyName
              studyDesigns
              studySlug
              subjects
            }
          }
        }
      }
    `
  );
  return allWorkspace.edges.map((n) => n.node);
};
