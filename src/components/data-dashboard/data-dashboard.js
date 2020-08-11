/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data dashboard component.
 * Use of this component within markdown is possible.
 * Use the tag <data-dashboard></data-dashboard>.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataSearch from "../data-search/data-search";
import DataSummary from "../data-summary/data-summary";
import DataWorkspaces from "../data-workspaces/data-workspaces";
import {DashboardWorkspaceStaticQuery} from "../../hooks/dashboard-workspace-query";
import ProviderDashboardFilter from "../provider-dashboard-filter/provider-dashboard-filter";
import * as DashboardSearchService from "../../utils/dashboard/dashboard-search.service";

function DataDashboard() {

    const workspacesQuery = DashboardWorkspaceStaticQuery();
    const termsByFacets = DashboardSearchService.getDashboardFacets(workspacesQuery);
    const facetByTerm = DashboardSearchService.getDashboardFacetByTerm(termsByFacets);
    const setOfTerms = DashboardSearchService.getDashboardSetOfTerms(termsByFacets);
    const checkboxGroups = DashboardSearchService.buildDashboardCheckboxesByFacet(termsByFacets);

    return (
        <ProviderDashboardFilter
            checkboxGroups={checkboxGroups}
            facetByTerm={facetByTerm}
            setOfTerms={setOfTerms}
            termsByFacets={termsByFacets}
            workspacesQuery={workspacesQuery}>
            <DataSearch/>
            <DataSummary/>
            <DataWorkspaces/>
        </ProviderDashboardFilter>
    )
}

export default DataDashboard;
