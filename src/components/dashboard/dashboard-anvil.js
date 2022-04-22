/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - AnVIL dashboard component.
 * Use of this component within markdown is possible.
 * <dashboard-anvil></dashboard-anvil>.
 */

// Core dependencies
import { useLocation } from "@reach/router";
import React from "react";

// App dependencies
import Dashboard from "./dashboard";
import DashboardSearch from "./dashboard-search/dashboard-search";
import DashboardTableEntities from "./dashboard-table-entities/dashboard-table-entities";
import DashboardTableSummary from "./dashboard-table-summary/dashboard-table-summary";
import { DashboardWorkspaceStaticQuery } from "../../hooks/dashboard-workspace-query";

// Template variables
const dashboardIndexFileName = "/dashboard-index-anvil.json";
const lunrIndexRefField = "projectId";
const searchFacets = [
  "consortium",
  "diseases",
  "dataTypes",
  "studyDesigns",
  "consentShortName",
  "accessType",
]; // AnVIL facets (selected from workspace property values) for the dashboard checkboxes.
const summaryKey = "consortium";
const tableHeadersEntities = [
  "consortium",
  "studyName",
  "gapId",
  "consentName",
  "projectId",
  "diseases",
  "accessType",
  "studyDesigns",
  "dataTypes",
  "samples",
  "subjects",
  "size",
];
const tableHeadersSummary = [
  "consortium",
  "cohorts",
  "samples",
  "subjects",
  "size",
];

function DashboardAnVIL() {
  const dashboardEntities = DashboardWorkspaceStaticQuery();
  const currentLocation = useLocation();
  const { href } = currentLocation || {};

  return (
    <Dashboard
      dashboardEntities={dashboardEntities}
      dashboardIndexFileName={dashboardIndexFileName}
      dashboardURL={href}
      dataset={"anvil"}
      resultKey={lunrIndexRefField}
      searchFacets={searchFacets}
      summaryKey={summaryKey}
      tableHeadersEntities={tableHeadersEntities}
      tableHeadersSummary={tableHeadersSummary}
    >
      <DashboardSearch />
      <DashboardTableSummary />
      <DashboardTableEntities dataset={"anvil"} />
    </Dashboard>
  );
}

export default DashboardAnVIL;
