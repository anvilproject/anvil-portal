/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard study snapshot component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardStudyRequestAccessInfo from "../dashboard-study-request-access-info/dashboard-study-request-access-info";
import DashboardStudyStats, {
  IStat,
} from "../dashboard-study-stats/dashboard-study-stats";
import DashboardStudySummary, {
  IStudySummary,
} from "../dashboard-study-summmary/dashboard-study-summary";

// Styles
import * as compStyles from "./dashboard-study-snapshot.module.css";

interface DashboardStudySnapshotProps {
  studyStat: IStat;
  studySummary: IStudySummary;
}

function DashboardStudySnapshot(
  props: DashboardStudySnapshotProps
): JSX.Element {
  const { studyStat, studySummary } = props;

  return (
    <div className={compStyles.studySnapshot}>
      {studyStat ? <DashboardStudyStats studyStat={studyStat} /> : null}
      <DashboardStudySummary studySummary={studySummary} />
      <DashboardStudyRequestAccessInfo />
    </div>
  );
}

export default DashboardStudySnapshot;
