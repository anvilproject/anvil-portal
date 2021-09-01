/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard study summary component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./dashboard-study-summary.module.css";

export interface IStudySummary {
  accessTypes: string[] | undefined;
  consentShortNames: string[];
  dataTypes: string[];
  diseases: string[] | undefined;
  focuses: string[] | undefined;
  studyDesigns: string[];
  studyPlatforms: string[] | undefined;
  subjectsTotal: number | undefined;
}

interface DashboardStudySummaryProps {
  studySummary: IStudySummary;
}

function DashboardStudySummary(props: DashboardStudySummaryProps): JSX.Element {
  const { studySummary } = props;
  const {
    accessTypes,
    consentShortNames,
    dataTypes,
    diseases,
    focuses,
    studyDesigns,
    studyPlatforms,
    subjectsTotal,
  } = studySummary;

  const formatSummary = (values: string[] | undefined): string => {
    if (values && values.length) {
      return values.join(", ");
    }
    return "--";
  };

  return (
    <>
      <h3>Summary</h3>
      <div className={compStyles.summaries}>
        {studyPlatforms ? (
          <div className={compStyles.summary}>
            <span className={compStyles.label}>Platforms</span>
            <span className={compStyles.value}>
              {formatSummary(studyPlatforms)}
            </span>
          </div>
        ) : null}
        <div className={compStyles.summary}>
          <span className={compStyles.label}>Consent Codes</span>
          <span className={compStyles.value}>
            {formatSummary(consentShortNames)}
          </span>
        </div>
        {diseases ? (
          <div className={compStyles.summary}>
            <span className={compStyles.label}>Diseases</span>
            <span className={compStyles.value}>{formatSummary(diseases)}</span>
          </div>
        ) : null}
        {focuses ? (
          <div className={compStyles.summary}>
            <span className={compStyles.label}>Focus / Diseases</span>
            <span className={compStyles.value}>{formatSummary(focuses)}</span>
          </div>
        ) : null}
        {accessTypes ? (
          <div className={compStyles.summary}>
            <span className={compStyles.label}>Access</span>
            <span className={compStyles.value}>
              {formatSummary(accessTypes)}
            </span>
          </div>
        ) : null}
        <div className={compStyles.summary}>
          <span className={compStyles.label}>Study Design</span>
          <span className={compStyles.value}>
            {formatSummary(studyDesigns)}
          </span>
        </div>
        <div className={compStyles.summary}>
          <span className={compStyles.label}>Data Types</span>
          <span className={compStyles.value}>{formatSummary(dataTypes)}</span>
        </div>
        {subjectsTotal ? (
          <div className={compStyles.summary}>
            <span className={compStyles.label}>Subjects</span>
            <span className={compStyles.value}>
              {subjectsTotal.toLocaleString()}
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default DashboardStudySummary;
