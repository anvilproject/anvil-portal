/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service data dashboard workspaces.
 */

// App dependencies
import * as DashboardService from "./dashboard.service";
import * as DashboardTableService from "./dashboard-table.service";
import {DashboardWorkspaceStaticQuery} from "../../hooks/dashboard-workspace-query";

/**
 * Returns the dashboard workspaces filtered by results from the search, if applicable,
 * and then by "consortia", "dbgap" or "public" [shared].
 *
 * @param consortia
 * @param dbgap
 * @param filterResults
 * @param resultsExist
 * @param shared
 * @returns {*}
 */
export function getDashboardWorkspaces(consortia, dbgap, filterResults, resultsExist, shared) {

    /* Filter workspaces by dataset search, if applicable. */
    const workspaces = DashboardService.filterWorkspacesBySearchResults(DashboardWorkspaceStaticQuery(), filterResults, resultsExist);

    /* Filter workspaces by db gap readiness. */
    return DashboardService.filterDataByDBGapReadiness(workspaces, consortia, dbgap, shared);
}

/**
 * Returns a list of access types.
 *
 * @returns {[null]}
 */
export function getDashboardWorkspacesAccess() {

    const workspaces = DashboardWorkspaceStaticQuery();

    /* Get the set of access types. */
    const setOfAccess = new Set(workspaces.map(workspace => workspace.accessUI));

    return [...setOfAccess];
}

/**
 * Returns a list of data types.
 *
 * @returns {[null]}
 */
export function getDashboardWorkspacesDataTypes() {

    const workspaces = DashboardWorkspaceStaticQuery();

    const setOfDataTypes = new Set();

    /* Get the set of access types. */
    workspaces.forEach(workspace => {

        if ( workspace.dataType ) {

            workspace.dataType.forEach(type => {

                const dataType = DashboardTableService.switchDataType(type);
                setOfDataTypes.add(dataType)
            });
        }
    });

    /* Remove the "NA" data type. */
    if ( setOfDataTypes.has("NA") ) {

        setOfDataTypes.delete("NA");
    }

    return [...setOfDataTypes];
}
