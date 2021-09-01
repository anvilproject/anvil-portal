/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard study headline component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Breadcrumb from "../../breadcrumb/breadcrumb";
import Overline from "../../overline/overline";

// Styles
import compStyles from "./dashboard-study-headline.module.css";

interface DashboardStudyHeadlineProps {
  locationHistory: string;
  studyAccession: string;
  studyConsortia: string | undefined;
  studyName: string;
  studyUrl: string;
}

function DashboardStudyHeadline(
  props: DashboardStudyHeadlineProps
): JSX.Element {
  const {
    locationHistory,
    studyAccession,
    studyConsortia,
    studyName,
    studyUrl,
  } = props;
  const breadcrumb = {
    link: locationHistory,
    name: "Datasets",
  };
  const fhirUrl = `https://dbgap-api.ncbi.nlm.nih.gov/fhir/x1/ResearchStudy?_id=${studyAccession}&_format=json`;

  return (
    <div className={compStyles.studyHeadline}>
      <Breadcrumb breadcrumb={breadcrumb} />
      <h2 className={compStyles.title}>{studyName}</h2>
      <Overline>
        {studyConsortia ? (
          <span className={compStyles.studyConsortia}>{studyConsortia}</span>
        ) : null}
        <span className={compStyles.studyAccession}>{studyAccession}</span>
        <span className={compStyles.studySource}>
          <a href={studyUrl} target="_blank" rel="noreferrer">
            dbGap
          </a>
        </span>
        <span className={compStyles.studySource}>
          <a href={fhirUrl} target="_blank" rel="noreferrer">
            dbGap FHIR
          </a>
        </span>
      </Overline>
    </div>
  );
}

export default DashboardStudyHeadline;
