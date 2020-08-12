/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for dashboard data.
 */

/**
 * Filters workspaces by results from the dashboard search.
 *
 * @param workspaces
 * @param setOfResults
 * @returns {*}
 */
export function filterWorkspacesBySearchResults(workspaces, setOfResults) {

    return workspaces.filter(workspace => setOfResults.has(workspace.projectId));
}

/**
 * Returns true if the value is an array.
 *
 * @param value
 */
export function isArray(value) {

    return Array.isArray(value);
}
