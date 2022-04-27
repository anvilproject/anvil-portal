/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - NCPI dashboard component.
 * Use of this component within markdown is possible.
 * <dashboard-ncpi></dashboard-ncpi>.
 */

// Core dependencies
import { useLocation } from "@reach/router";
import React from "react";

// App dependencies
import Dashboard from "./dashboard";
import DashboardSearch from "./dashboard-search/dashboard-search";
import DashboardTableEntities from "./dashboard-table-entities/dashboard-table-entities";
import DashboardTableSummary from "./dashboard-table-summary/dashboard-table-summary";
import { DashboardNCPIStaticQuery } from "../../hooks/dashboard-ncpi-query";

// Template variables
const dashboardIndexFileName = "/dashboard-index-ncpi.json";
const lunrIndexRefField = "dbGapIdAccession";
const searchFacets = [
  "platforms",
  "focuses",
  "dataTypes",
  "studyDesigns",
  "consentCodes",
]; // NCPI facets (selected from NCPI study property values) for the dashboard checkboxes.
const summaryKey = "platforms";
const tableHeadersEntities = [
  "platforms",
  "studyName",
  "gapId",
  "focuses",
  "dataTypes",
  "studyDesigns",
  "consentCodes",
  "subjectsTotal",
];
const tableHeadersSummary = ["platforms", "studies", "subjectsTotal"];

function DashboardNCPI() {
  const dashboardEntities = DashboardNCPIStaticQuery();
  const currentLocation = useLocation();
  const { href } = currentLocation || {};

  return (
    <Dashboard
      dashboardEntities={dashboardEntities}
      dashboardIndexFileName={dashboardIndexFileName}
      dashboardURL={href}
      dataset={"ncpi"}
      resultKey={lunrIndexRefField}
      searchFacets={searchFacets}
      summaryKey={summaryKey}
      tableHeadersEntities={tableHeadersEntities}
      tableHeadersSummary={tableHeadersSummary}
      totalsWarning
    >
      <DashboardSearch />
      <DashboardTableSummary />
      <DashboardTableEntities dataset={"ncpi"} />
    </Dashboard>
  );
}

export default DashboardNCPI;
