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

export default ({ data, location, pageContext }) => {
  const { description, slug } = pageContext;
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
      description={description}
      docPath={slug}
      navigation={pageContext}
      ncpi={ncpi}
      styles={styles}
      title={study.studyName}
    >
      <DashboardStudy
        locationHistory={locationHistory}
        ncpi={ncpi}
        study={study}
      />
    </Layout>
  );
};

export const query = graphql`
  query ($id: String!) {
    dashboardNcpiStudy(id: { eq: $id }) {
      fhirUrl
      studyAccession
      studyDescription
      studyId
      studyName
      studyRequestAccessUrl
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
      fhirUrl
      studyAccession
      studyConsortia
      studyDescription
      studyId
      studyName
      studyRequestAccessUrl
      studyStat {
        cohorts
        samples
        size
        subjects
      }
      studySummary {
        accessTypes
        consentNames {
          long
          short
        }
        dataTypes
        diseases
        studyDesigns
      }
      studyWorkspaces {
        accessType
        consentName {
          long
          short
        }
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
