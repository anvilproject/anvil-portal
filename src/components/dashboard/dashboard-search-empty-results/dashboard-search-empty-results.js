/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search empty results component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";

// Styles
import compStyles from "./dashboard-search-empty-results.module.css";

function DashboardSearchEmptyResults() {
  const { entities } = useContext(ContextDashboard);
  const showEmptyResults = entities.length === 0;

  return showEmptyResults ? (
    <DashboardSearchPanel stretch>
      <div className={compStyles.error}>No results</div>
    </DashboardSearchPanel>
  ) : null;
}

export default DashboardSearchEmptyResults;
