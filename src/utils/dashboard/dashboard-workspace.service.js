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
 * @returns {*}
 */
export function getDashboardWorkspaces(workspacesQuery, setOfResults) {

    /* Set of results is empty. */
    if ( setOfResults.size === 0 ) {

        return [];
    }

    return DashboardService.filterWorkspacesBySearchResults(workspacesQuery, setOfResults);
}
