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
 * @param filterQuery
 * @param filterResults
 * @param shared
 * @returns {*}
 */
export function getDashboardWorkspaces(consortia, dbgap, filterQuery, filterResults, shared) {

    /* Filter workspaces by dataset search, if applicable. */
    const workspaces = DashboardService.filterWorkspacesBySearchResults(DashboardWorkspaceStaticQuery(), filterQuery, filterResults);

    /* Filter workspaces by db gap readiness. */
    return DashboardService.filterDataByDBGapReadiness(workspaces, consortia, dbgap, shared);
}
