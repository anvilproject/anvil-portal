/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service data dashboard workspaces.
 */

// App dependencies
import * as DashboardService from "./dashboard.service";
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

    if ( !resultsExist ) {

        return [];
    }

    /* Filter workspaces by dataset search, if applicable. */
    const workspaces = DashboardService.filterWorkspacesBySearchResults(DashboardWorkspaceStaticQuery(), filterResults);

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
 * Returns a list of consortia.
 *
 * @returns {[null]}
 */
export function getDashboardWorkspacesConsortia() {

    const workspaces = DashboardWorkspaceStaticQuery();

    const setOfConsortia = new Set();

    /* Get the set of consortia. */
    workspaces.forEach(workspace => {

        setOfConsortia.add(workspace.consortium);
    });

    return [...setOfConsortia];
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

        if ( workspace.dataTypes ) {

            workspace.dataTypes.forEach(type => {

                setOfDataTypes.add(type)
            });
        }
    });

    /* Remove the "NA" data type. */
    if ( setOfDataTypes.has("NA") ) {

        setOfDataTypes.delete("NA");
    }

    return [...setOfDataTypes];
}
