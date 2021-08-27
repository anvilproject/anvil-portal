/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard study overview component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./dashboard-study-overview.module.css";

interface DashboardStudyOverviewProps {
  studyDescription: string;
}

function DashboardStudyOverview(
  props: DashboardStudyOverviewProps
): JSX.Element {
  const { studyDescription } = props;

  return (
    <div className={compStyles.studyOverview}>
      <h3>Description</h3>
      <div dangerouslySetInnerHTML={{ __html: studyDescription }} />
    </div>
  );
}

export default DashboardStudyOverview;
