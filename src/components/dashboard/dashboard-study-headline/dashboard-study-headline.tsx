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
import * as compStyles from "./dashboard-study-headline.module.css";

interface DashboardStudyHeadlineProps {
  fhirUrl: string;
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
    fhirUrl,
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
          <a // eslint-disable-line react/jsx-no-target-blank
            href={studyUrl}
            rel="noopener"
            target="_blank"
          >
            dbGap
          </a>
        </span>
        <span className={compStyles.studySource}>
          <a // eslint-disable-line react/jsx-no-target-blank
            href={fhirUrl}
            rel="noopener"
            target="_blank"
          >
            dbGap FHIR
          </a>
        </span>
      </Overline>
    </div>
  );
}

export default DashboardStudyHeadline;
