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
    countLabel,
    dashboardEntities,
    dashboardIndexFileName,
    dashboardURL,
    dataset,
    resultKey,
    searchFacets,
    summaryKey,
    tableHeadersEntities,
    tableHeadersSummary,
    totalsWarning
  } = props;
  const setOfEntities = DashboardSearchService.getDashboardSetOfEntities(
    dashboardEntities,
    resultKey
  );
  const setOfTermsByFacet = DashboardSearchService.getDashboardSetOfTermsByFacet(
    dashboardEntities,
    searchFacets
  );
  const setOfSummaryKeyTerms = setOfTermsByFacet.get(summaryKey);
  const termSearchValueByTermDisplay = DashboardSearchService.getDashboardTermSearchValueByTerm(
    setOfTermsByFacet
  );

  return (
    <ProviderDashboard
      countLabel={countLabel}
      dashboardEntities={dashboardEntities}
      dashboardIndexFileName={dashboardIndexFileName}
      dashboardURL={dashboardURL}
      resultKey={resultKey}
      setOfEntities={setOfEntities}
      setOfSummaryKeyTerms={setOfSummaryKeyTerms}
      setOfTermsByFacet={setOfTermsByFacet}
      summaryKey={summaryKey}
      tableHeadersEntities={tableHeadersEntities}
      tableHeadersSummary={tableHeadersSummary}
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
