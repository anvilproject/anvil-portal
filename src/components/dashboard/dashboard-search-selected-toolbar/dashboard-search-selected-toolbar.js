/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search selected toolbar component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";
import DashboardSearchSelectedControlBar from "../dashboard-search-selected-control-bar/dashboard-search-selected-control-bar";

function DashboardSearchSelectedToolbar() {
  return (
    <DashboardSearchPanel spanGrid>
      <DashboardSearchSelectedControlBar />
    </DashboardSearchPanel>
  );
}

export default DashboardSearchSelectedToolbar;
