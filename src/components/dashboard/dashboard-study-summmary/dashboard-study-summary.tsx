/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard study summary component.
 */

// Core dependencies
import React, { Fragment } from "react";

// App dependencies
import Tooltip from "../../tooltip/tooltip";

// Styles
import * as compStyles from "./dashboard-study-summary.module.css";

export interface ConsentName {
  long: string;
  short: string;
}

export interface StudySummary {
  accessTypes?: string[];
  consentNames?: ConsentName[];
  consentShortNames?: string[];
  dataTypes: string[];
  diseases?: string[];
  focuses?: string[];
  studyDesigns: string[];
  studyPlatforms?: string[];
  subjectsTotal?: number;
}

interface DashboardStudySummaryProps {
  studySummary: StudySummary;
}

function DashboardStudySummary(props: DashboardStudySummaryProps): JSX.Element {
  const { studySummary } = props;
  const {
    accessTypes,
    consentNames,
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
      {studyPlatforms && (
        <div className={compStyles.summary}>
          <span className={compStyles.label}>Platforms</span>
          <span className={compStyles.value}>
            {formatSummary(studyPlatforms)}
          </span>
        </div>
      )}
      {consentShortNames && (
        <div className={compStyles.summary}>
          <span className={compStyles.label}>Consent Codes</span>
          <span className={compStyles.value}>
            {formatSummary(consentShortNames)}
          </span>
        </div>
      )}
      {consentNames && (
        <div className={compStyles.summary}>
          <span className={compStyles.label}>Consent Codes</span>
          <span className={compStyles.value}>
            {consentNames.map(({ long, short }, c) => (
              <Fragment key={`${short}-${long}`}>
                {c !== 0 && <span>, </span>}
                {long ? (
                  <Tooltip label={long}>
                    <span className={compStyles.consent}>{short}</span>
                  </Tooltip>
                ) : (
                  <span>{short}</span>
                )}
              </Fragment>
            ))}
          </span>
        </div>
      )}
      {diseases && (
        <div className={compStyles.summary}>
          <span className={compStyles.label}>Diseases</span>
          <span className={compStyles.value}>{formatSummary(diseases)}</span>
        </div>
      )}
      {focuses && (
        <div className={compStyles.summary}>
          <span className={compStyles.label}>Focus / Diseases</span>
          <span className={compStyles.value}>{formatSummary(focuses)}</span>
        </div>
      )}
      {accessTypes && (
        <div className={compStyles.summary}>
          <span className={compStyles.label}>Access</span>
          <span className={compStyles.value}>{formatSummary(accessTypes)}</span>
        </div>
      )}
      <div className={compStyles.summary}>
        <span className={compStyles.label}>Study Design</span>
        <span className={compStyles.value}>{formatSummary(studyDesigns)}</span>
      </div>
      <div className={compStyles.summary}>
        <span className={compStyles.label}>Data Types</span>
        <span className={compStyles.value}>{formatSummary(dataTypes)}</span>
      </div>
      {subjectsTotal && (
        <div className={compStyles.summary}>
          <span className={compStyles.label}>Subjects</span>
          <span className={compStyles.value}>
            {subjectsTotal.toLocaleString()}
          </span>
        </div>
      )}
    </>
  );
}

export default DashboardStudySummary;
