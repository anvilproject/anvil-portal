/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table toolbar component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardCopyURL from "../dashboard-copy-url/dashboard-copy-url";
import DashboardDownloadTSV from "../dashboard-download-tsv/dashboard-download-tsv";
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";

// Styles
import * as compStyles from "./dashboard-table-toolbar.module.css";

function DashboardTableToolbar() {
  return (
    <DashboardSearchPanel spanGrid>
      <span className={compStyles.tools}>
        <DashboardDownloadTSV />
        <DashboardCopyURL />
      </span>
    </DashboardSearchPanel>
  );
}

export default DashboardTableToolbar;
