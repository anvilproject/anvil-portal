/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - NCPI dashboard component.
 * Use of this component within markdown is possible.
 * <dashboard-ncpi></dashboard-ncpi>.
 */

// Core dependencies
import {useLocation} from "@reach/router";
import React from "react";

// App dependencies
import Dashboard from "./dashboard";
import DashboardSearch from "./dashboard-search/dashboard-search";
import DashboardTableEntities from "./dashboard-table-entities/dashboard-table-entities";
import DashboardTableSummary from "./dashboard-table-summary/dashboard-table-summary";
import {DashboardNCPIStaticQuery} from "../../hooks/dashboard-ncpi-query";

// Template variables
const countLabel = "Studies";
const dashboardIndexFileName = "/dashboard-index-ncpi.json";
const lunrIndexRefField = "dbGapIdAccession";
const searchFacets = ["platform", "diseases", "dataTypes", "consentShortNames"]; // NCPI facets (selected from NCPI study property values) for the dashboard checkboxes.
const summaryKey = "platform";
const tableHeadersEntities = ["platform", "gapId", "studyName", "diseases", "dataTypes", "consentCodes", "subjectsTotal"];
const tableHeadersSummary = ["platform", "studies", "subjectsTotal"];

function DashboardNCPI() {

    const dashboardEntities = DashboardNCPIStaticQuery();
    const currentLocation = useLocation();
    const {pathname: dashboardPathname} = currentLocation || {};

    return (
        <Dashboard countLabel={countLabel}
                   dashboardEntities={dashboardEntities}
                   dashboardIndexFileName={dashboardIndexFileName}
                   dashboardPathname={dashboardPathname}
                   dataset={"ncpi"}
                   resultKey={lunrIndexRefField}
                   searchFacets={searchFacets}
                   summaryKey={summaryKey}
                   tableHeadersEntities={tableHeadersEntities}
                   tableHeadersSummary={tableHeadersSummary}>
            <DashboardSearch/>
            <DashboardTableSummary/>
            <DashboardTableEntities ncpi/>
        </Dashboard>
    )
}

export default DashboardNCPI;
