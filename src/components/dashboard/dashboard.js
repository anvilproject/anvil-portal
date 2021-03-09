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

    const {children, countLabel, dashboardEntities, dashboardIndexFileName, dashboardPathname, dataset,
        resultKey, searchFacets, summaryKey, tableHeadersEntities, tableHeadersSummary, totalsWarning} = props;
    const facetsByTerm = DashboardSearchService.getDashboardFacetsByTerm(dashboardEntities, searchFacets);
    const checkboxGroups = DashboardSearchService.buildDashboardCheckboxesByFacet(facetsByTerm, searchFacets);
    const setOfSearchGroups = DashboardSearchService.getDashboardSetOfSearchGroups(searchFacets);
    const setOfSummaryKeyTerms = DashboardSearchService.getSetOfSummaryKeyTerms(facetsByTerm, summaryKey);
    const setOfTerms = DashboardSearchService.getDashboardSetOfTerms(facetsByTerm);
    const termSearchValueByTermDisplay = DashboardSearchService.getDashboardTermSearchValueByTermDisplay(facetsByTerm);

    return (
        <ProviderDashboard checkboxGroups={checkboxGroups}
                           countLabel={countLabel}
                           dashboardEntities={dashboardEntities}
                           dashboardIndexFileName={dashboardIndexFileName}
                           dashboardPathname={dashboardPathname}
                           facetsByTerm={facetsByTerm}
                           resultKey={resultKey}
                           setOfSearchGroups={setOfSearchGroups}
                           setOfSummaryKeyTerms={setOfSummaryKeyTerms}
                           setOfTerms={setOfTerms}
                           summaryKey={summaryKey}
                           tableHeadersEntities={tableHeadersEntities}
                           tableHeadersSummary={tableHeadersSummary}
                           termSearchValueByTermDisplay={termSearchValueByTermDisplay}
                           totalsWarning={totalsWarning}>
            <ProviderDashboardDownloads dataset={dataset}>
                {children}
            </ProviderDashboardDownloads>
        </ProviderDashboard>
    )
}

export default Dashboard;
