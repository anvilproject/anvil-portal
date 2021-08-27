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
import DashboardStudyStats, {
  IStat,
} from "../dashboard-study-stats/dashboard-study-stats";
import DashboardStudySummary, {
  IStudySummary,
} from "../dashboard-study-summmary/dashboard-study-summary";
import DashboardStudyTable, {
  IStudyWorkspace,
} from "../dashboard-study-table/dashboard-study-table";

// Styles
import compStyles from "./dashboard-study.module.css";

export interface IStudy {
  studyAccession: string;
  studyConsortia?: string;
  studyDescription: string;
  studyName: string;
  studyStat?: IStat;
  studySummary: IStudySummary;
  studyWorkspaces?: IStudyWorkspace[];
  studyUrl: string;
}

interface DashboardStudyProps {
  locationHistory: string;
  study: IStudy;
}

function DashboardStudy(props: DashboardStudyProps): JSX.Element {
  const { locationHistory, study } = props;
  const {
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
        locationHistory={locationHistory}
        studyAccession={studyAccession}
        studyConsortia={studyConsortia}
        studyName={studyName}
        studyUrl={studyUrl}
      />
      {studyStat ? <DashboardStudyStats studyStat={studyStat} /> : null}
      <DashboardStudyOverview studyDescription={studyDescription} />
      <DashboardStudySummary studySummary={studySummary} />
      {studyWorkspaces ? (
        <DashboardStudyTable studyWorkspaces={studyWorkspaces} />
      ) : null}
    </div>
  );
}

export default DashboardStudy;
