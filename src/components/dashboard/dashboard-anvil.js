/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - AnVIL dashboard component.
 * Use of this component within markdown is possible.
 * <dashboard-anvil></dashboard-anvil>.
 */

// Core dependencies
import {useLocation} from "@reach/router";
import React from "react";

// App dependencies
import Dashboard from "./dashboard";
import DashboardSearch from "./dashboard-search/dashboard-search";
import DashboardTableEntities from "./dashboard-table-entities/dashboard-table-entities";
import DashboardTableSummary from "./dashboard-table-summary/dashboard-table-summary";
import {DashboardWorkspaceStaticQuery} from "../../hooks/dashboard-workspace-query";

// Template variables
const countLabel = "Cohorts";
const dashboardIndexFileName = "/dashboard-index-anvil.json";
const lunrIndexRefField = "projectId";
const searchFacets = ["consortium", "diseases", "dataTypes", "accessType"]; // AnVIL facets (selected from workspace property values) for the dashboard checkboxes.
const summaryKey = "consortium";
const tableHeadersEntities = ["consortium", "projectId", "gapId", "studyName", "diseases", "accessType", "dataTypes", "samples", "subjects", "size"]; // add back access type
const tableHeadersSummary = ["consortium", "cohorts", "samples", "subjects", "size"];

function DashboardAnVIL() {

    const dashboardEntities = DashboardWorkspaceStaticQuery();
    const currentLocation = useLocation();
    const {pathname: dashboardPathname} = currentLocation || {};

    return (
        <Dashboard countLabel={countLabel}
                   dashboardEntities={dashboardEntities}
                   dashboardIndexFileName={dashboardIndexFileName}
                   dashboardPathname={dashboardPathname}
                   dataset={"anvil"}
                   resultKey={lunrIndexRefField}
                   searchFacets={searchFacets}
                   summaryKey={summaryKey}
                   tableHeadersEntities={tableHeadersEntities}
                   tableHeadersSummary={tableHeadersSummary}>
            <DashboardSearch/>
            <DashboardTableSummary/>
            <DashboardTableEntities studies/>
        </Dashboard>
    )
}

export default DashboardAnVIL;
