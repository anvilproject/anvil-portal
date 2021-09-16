/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardGrid from "../dashboard-grid/dashboard-grid";
import DashboardSearchCheckboxes from "../dashboard-search-checkboxes/dashboard-search-checkboxes";
import DashboardSearchEmptyResults from "../dashboard-search-empty-results/dashboard-search-empty-results";
import DashboardSearchInput from "../dashboard-search-input/dashboard-search-input";
import DashboardSearchSelectedToolbar from "../dashboard-search-selected-toolbar/dashboard-search-selected-toolbar";
import DashboardTableToolbar from "../dashboard-table-toolbar/dashboard-table-toolbar";

// Styles
import * as compStyles from "./dashboard-search.module.css";

function DashboardSearch() {
  return (
    <div className={compStyles.search}>
      <DashboardGrid>
        <DashboardSearchInput />
        <DashboardSearchCheckboxes />
        <DashboardSearchSelectedToolbar />
        <DashboardTableToolbar />
        <DashboardSearchEmptyResults />
      </DashboardGrid>
    </div>
  );
}

export default DashboardSearch;
