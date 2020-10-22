/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - NCPI data dashboard component.
 * Use of this component within markdown is possible.
 * Use the tag <data-dashboard-ncpi></data-dashboard-ncpi>.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataDashboard from "../data-dashboard/data-dashboard";
import DataSearch from "../data-search/data-search";
import DataTableEntities from "../data-table-entities/data-table-entities";
import {DashboardNCPIStaticQuery} from "../../hooks/dashboard-ncpi-query";

// Template variables
const dashboardIndexFileName = "/dashboard-index-ncpi.json";
const lunrIndexRefField = "dbGapIdAccession";
const searchFacets = ["platform", "consentShortNames"]; // NCPI facets (selected from NCPI study property values) for the dashboard checkboxes.
const summaryKey = "platform";
const tableHeadersEntities = ["platform", "gapId", "studyName", "diseases", "consentCodes"];
const tableHeadersSummary = ["platform", "cohorts"];

function DataDashboardNCPI() {

    const dashboardEntities = DashboardNCPIStaticQuery();

    return (
        <DataDashboard dashboardEntities={dashboardEntities}
                       dashboardIndexFileName={dashboardIndexFileName}
                       resultKey={lunrIndexRefField}
                       searchFacets={searchFacets}
                       summaryKey={summaryKey}
                       tableHeadersEntities={tableHeadersEntities}
                       tableHeadersSummary={tableHeadersSummary}>
            <DataSearch/>
            <DataTableEntities ncpi/>
        </DataDashboard>
    )
}

export default DataDashboardNCPI;
