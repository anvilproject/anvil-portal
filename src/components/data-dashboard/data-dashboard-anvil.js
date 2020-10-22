/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data dashboard component.
 * Use of this component within markdown is possible.
 * Use the tag <data-dashboard-anvil></data-dashboard-anvil>.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataDashboard from "./data-dashboard";
import DataSearch from "./data-search/data-search";
import DataTableEntities from "./data-table-entities/data-table-entities";
import DataTableSummary from "./data-table-summary/data-table-summary";
import {DashboardWorkspaceStaticQuery} from "../../hooks/dashboard-workspace-query";

// Template variables
const dashboardIndexFileName = "/dashboard-index-anvil.json";
const lunrIndexRefField = "projectId";
const searchFacets = ["consortium", "accessType", "dataTypes"]; // AnVIL facets (selected from workspace property values) for the dashboard checkboxes.
const summaryKey = "consortium";
const tableHeadersEntities = ["consortium", "projectId", "gapId", "studyName", "diseases", "accessType", "dataTypes", "size", "subjects"];
const tableHeadersSummary = ["consortium", "cohorts", "subjects", "samples", "files", "sizeTB"];

function DataDashboardAnVIL() {

    const dashboardEntities = DashboardWorkspaceStaticQuery();

    return (
        <DataDashboard dashboardEntities={dashboardEntities}
                       dashboardIndexFileName={dashboardIndexFileName}
                       resultKey={lunrIndexRefField}
                       searchFacets={searchFacets}
                       summaryKey={summaryKey}
                       tableHeadersEntities={tableHeadersEntities}
                       tableHeadersSummary={tableHeadersSummary}>
            <DataSearch/>
            <DataTableSummary/>
            <DataTableEntities studies/>
        </DataDashboard>
    )
}

export default DataDashboardAnVIL;
