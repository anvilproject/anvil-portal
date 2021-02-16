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
import DashboardSearch from "./dashboard-search/dashboard-search";
import DashboardSummary from "./dashboard-summary/dashboard-summary";
import DashboardWorkspaces from "./dashboard-workspaces/dashboard-workspaces";
import {DashboardWorkspaceStaticQuery} from "../../hooks/dashboard-workspace-query";
import ProviderDashboard from "./provider-dashboard/provider-dashboard";
import ProviderDashboardDownloads from "./provider-dashboard-downloads/provider-dashboard-downloads";
import * as DashboardSearchService from "../../utils/dashboard/dashboard-search.service";

function Dashboard() {

    const workspacesQuery = DashboardWorkspaceStaticQuery();
    const facetsByTerm = DashboardSearchService.getDashboardFacetsByTerm(workspacesQuery);
    const checkboxGroups = DashboardSearchService.buildDashboardCheckboxesByFacet(facetsByTerm);
    const setOfSearchGroups = DashboardSearchService.getDashboardSetOfSearchGroups();
    const setOfTerms = DashboardSearchService.getDashboardSetOfTerms(facetsByTerm);
    const tableHeadersEntities = ["consortium", "projectId", "gapId", "studyName", "diseases", "accessType", "dataTypes", "size", "subjects"];
    const tableHeadersSummary = ["consortium", "cohorts", "subjects", "samples","files", "sizeTB"];

    return (
        <ProviderDashboard
            checkboxGroups={checkboxGroups}
            facetsByTerm={facetsByTerm}
            setOfSearchGroups={setOfSearchGroups}
            setOfTerms={setOfTerms}
            tableHeadersEntities={tableHeadersEntities}
            tableHeadersSummary={tableHeadersSummary}
            workspacesQuery={workspacesQuery}>
            <ProviderDashboardDownloads>
                <DashboardSearch/>
                <DashboardSummary/>
                <DashboardWorkspaces/>
            </ProviderDashboardDownloads>
        </ProviderDashboard>
    )
}

export default Dashboard;
