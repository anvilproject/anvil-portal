/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service data dashboard workspaces.
 */

// App dependencies
import * as DashboardService from "./dashboard.service";

/**
 * Returns the dashboard workspaces filtered by results from the search.
 *
 * @param workspacesQuery
 * @param setOfResults
 * @param querying
 * @returns {*}
 */
export function getDashboardWorkspaces(workspacesQuery, setOfResults, querying) {

    /* Querying is active, and the set of results is empty. */
    if ( querying && setOfResults.size === 0 ) {

        return [];
    }

    /* Return all workspaces - querying is inactive. */
    if ( !querying ) {

        return workspacesQuery;
    }

    return DashboardService.filterWorkspacesBySearchResults(workspacesQuery, setOfResults);
}
