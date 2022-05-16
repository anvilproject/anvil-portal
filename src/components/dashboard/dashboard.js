/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data dashboard component.
 * Use of this component within markdown is possible.
 * <dashboard></dashboard>.
 */

// Core dependencies
import React from "react";

// App dependencies
import ProviderDashboard from "./provider-dashboard/provider-dashboard";
import ProviderDashboardDownloads from "./provider-dashboard-downloads/provider-dashboard-downloads";
import * as DashboardSearchService from "../../utils/dashboard/dashboard-search.service";

function Dashboard(props) {
  const {
    children,
    dashboardEntities,
    dashboardIndexFileName,
    dashboardURL,
    dataset,
    resultKey,
    searchFacets,
    summaryKey,
    tableHeadersEntities,
    tableHeadersSummary,
    termGroupsByFacet,
    totalsWarning,
  } = props;
  const setOfEntities = DashboardSearchService.getDashboardSetOfEntities(
    dashboardEntities,
    resultKey
  );
  const rowsByRowKey = DashboardSearchService.getDashboardRowsByRowKey(
    dashboardEntities,
    resultKey
  );
  const setOfTermsByFacet =
    DashboardSearchService.getDashboardSetOfTermsByFacet(
      dashboardEntities,
      searchFacets
    );
  const termGroupsByTermByFacet =
    DashboardSearchService.getDashboardTermGroupsByTermByFacet(
      termGroupsByFacet,
      setOfTermsByFacet
    ); // deletes from setOfTermsByFacet any facets identified as a term group
  const termSearchValueByTermDisplay =
    DashboardSearchService.getDashboardTermSearchValueByTerm(setOfTermsByFacet);
  const panelCount = DashboardSearchService.getDashboardPanelCount(
    searchFacets,
    termGroupsByFacet
  );

  return (
    <ProviderDashboard
      dashboardIndexFileName={dashboardIndexFileName}
      dashboardURL={dashboardURL}
      panelCount={panelCount}
      rowsByRowKey={rowsByRowKey}
      setOfEntities={setOfEntities}
      setOfTermsByFacet={setOfTermsByFacet}
      summaryKey={summaryKey}
      tableHeadersEntities={tableHeadersEntities}
      tableHeadersSummary={tableHeadersSummary}
      termGroupsByFacet={termGroupsByFacet}
      termGroupsByTermByFacet={termGroupsByTermByFacet}
      termSearchValueByTermDisplay={termSearchValueByTermDisplay}
      totalsWarning={totalsWarning}
    >
      <ProviderDashboardDownloads dataset={dataset}>
        {children}
      </ProviderDashboardDownloads>
    </ProviderDashboard>
  );
}

export default Dashboard;
