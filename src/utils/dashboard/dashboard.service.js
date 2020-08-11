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

/**
 * Returns a true value for any rehype-react custom prop.
 * i.e. A rehype-react prop without a value will not be interpreted as true; instead, it will be passed as the empty string "".
 *
 * @param value
 * @returns {boolean}
 */
export function parseRehypeProp(value) {

    return !!value || value === "";
}
