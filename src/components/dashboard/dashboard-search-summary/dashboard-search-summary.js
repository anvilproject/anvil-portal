/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search summary component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";
import * as DashboardSummaryService from "../../../utils/dashboard/dashboard-summary.service";

// Styles
import * as compStyles from "./dashboard-search-summary.module.css";

function DashboardSearchSummary() {
  const { summaries, tableHeadersSummary } = useContext(ContextDashboard);
  const searchSummaries = DashboardSummaryService.getDashboardSnapshotSummary(
    summaries,
    tableHeadersSummary
  );

  return (
    <DashboardSearchPanel inverted row spanGrid>
      <h4 className={compStyles.label}>Current selection:</h4>
      {searchSummaries && searchSummaries.length ? (
        searchSummaries.map((summary, s) => (
          <h4 className={compStyles.stat} key={s}>
            {summary.count} {summary.label}
          </h4>
        ))
      ) : (
        <h4 className={compStyles.stat}>No Results</h4>
      )}
    </DashboardSearchPanel>
  );
}

export default DashboardSearchSummary;
