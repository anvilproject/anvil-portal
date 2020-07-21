/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service data dashboard workspaces.
 */

// App dependencies
import * as DashboardAccessibilityService from "./dashboard-accessibility.service";
import {DashboardWorkspaceStaticQuery} from "../../hooks/dashboard-workspace-query";

/**
 * Returns the dashboard workspaces filtered by "consortia", "dbgap" or "public" [shared].
 *
 * @param consortia
 * @param dbgap
 * @param shared
 * @returns {*}
 */
export function getDashboardWorkspaces(consortia, dbgap, shared) {

    /* Filter the query by db gap readiness. */
    return DashboardAccessibilityService.filterDataByDBGapReadiness(DashboardWorkspaceStaticQuery(), consortia, dbgap, shared);
}
