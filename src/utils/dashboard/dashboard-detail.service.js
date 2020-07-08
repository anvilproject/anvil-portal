/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service data dashboard detail (workspaces).
 */

// App dependencies
import * as DashboardAccessibilityService from "./dashboard-accessibility.service";
import {DashboardDetailStaticQuery} from "../../hooks/dashboard-detail-query";

/**
 * Returns the dashboard detail (workspaces) filtered by "consortia", "dbgap" or "public" [shared].
 *
 * @param consortia
 * @param dbgap
 * @param shared
 * @returns {*}
 */
export function getDashboardDetail(consortia, dbgap, shared) {

    /* Filter the query by db gap readiness. */
    return DashboardAccessibilityService.filterDataByDBGapReadiness(DashboardDetailStaticQuery(), consortia, dbgap, shared);
}
