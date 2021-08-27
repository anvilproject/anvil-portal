/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL dashboard study template component.
 * Renders dashboard study detail page.
 */

// Core dependencies
import { graphql } from "gatsby";
import React from "react";

// App dependencies
import DashboardStudy from "../components/dashboard/dashboard-study/dashboard-study";
import Layout from "../components/layout";

export default ({ data, location }) => {
  const { context } = data.sitePage;
  const { slug, title } = context;
  const study = data.dashboardStudy || data.dashboardNcpiStudy;
  const styles = { alignment: "left" };
  const ncpi = slug.startsWith("/ncpi");
  const { state } = location || {};
  let { locationHistory } = state || "";
  if (!locationHistory) {
    locationHistory = ncpi ? "/ncpi/data" : "/data";
  }

  return (
    <Layout
      description={study.studyName}
      docPath={slug}
      navigation={context}
      ncpi={ncpi}
      styles={styles}
      title={title}
    >
      <DashboardStudy locationHistory={locationHistory} study={study} />
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    sitePage(context: { id: { eq: $id } }) {
      context {
        id
        menuPath
        slug
        studyId
        title
      }
    }
    dashboardNcpiStudy(id: { eq: $id }) {
      studyAccession
      studyDescription
      studyId
      studyName
      studySummary {
        consentShortNames
        dataTypes
        focuses
        studyDesigns
        studyPlatforms
        subjectsTotal
      }
      studyUrl
    }
    dashboardStudy(id: { eq: $id }) {
      studyAccession
      studyConsortia
      studyDescription
      studyId
      studyName
      studyStat {
        cohorts
        samples
        size
        subjects
      }
      studySummary {
        accessTypes
        consentShortNames
        dataTypes
        diseases
        studyDesigns
      }
      studyWorkspaces {
        accessType
        consentShortName
        dataTypes
        diseases
        projectId
        samples
        size
        studyDesigns
        subjects
      }
      studyUrl
    }
  }
`;
