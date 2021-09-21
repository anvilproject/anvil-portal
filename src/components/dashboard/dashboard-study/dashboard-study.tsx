/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard study component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardStudyHeadline from "../dashboard-study-headline/dashboard-study-headline";
import DashboardStudyOverview from "../dashboard-study-overview/dashboard-study-overview";
import DashboardStudySnapshot from "../dashboard-study-snapshot/dashboard-study-snapshot";
import { IStat } from "../dashboard-study-stats/dashboard-study-stats";
import { IStudySummary } from "../dashboard-study-summmary/dashboard-study-summary";
import DashboardStudyTable, {
  IStudyWorkspace,
} from "../dashboard-study-table/dashboard-study-table";

// Styles
import * as compStyles from "./dashboard-study.module.css";

export interface IStudy {
  fhirUrl: string;
  studyAccession: string;
  studyConsortia?: string;
  studyDescription: string;
  studyName: string;
  studyStat: IStat;
  studySummary: IStudySummary;
  studyWorkspaces?: IStudyWorkspace[];
  studyUrl: string;
}

interface DashboardStudyProps {
  locationHistory: string;
  ncpi: boolean;
  study: IStudy;
}

function DashboardStudy(props: DashboardStudyProps): JSX.Element {
  const { locationHistory, ncpi, study } = props;
  const {
    fhirUrl,
    studyAccession,
    studyConsortia,
    studyDescription,
    studyName,
    studyStat,
    studySummary,
    studyWorkspaces,
    studyUrl,
  } = study;

  return (
    <div className={compStyles.dashboardStudy}>
      <DashboardStudyHeadline
        fhirUrl={fhirUrl}
        locationHistory={locationHistory}
        studyAccession={studyAccession}
        studyConsortia={studyConsortia}
        studyName={studyName}
        studyUrl={studyUrl}
      />
      <DashboardStudyOverview ncpi={ncpi} studyDescription={studyDescription} />
      <DashboardStudySnapshot
        studyStat={studyStat}
        studySummary={studySummary}
      />
      {studyWorkspaces ? (
        <DashboardStudyTable studyWorkspaces={studyWorkspaces} />
      ) : null}
    </div>
  );
}

export default DashboardStudy;
