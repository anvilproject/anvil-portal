/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service data dashboard studies.
 */

// App dependencies
import * as DashboardService from "./dashboard.service";
import {DashboardStudyStaticQuery} from "../../hooks/dashboard-study-query";

/**
 * Returns the dashboard studies filtered by results from the search, if applicable.
 *
 * @param filterQuery
 * @param filterResults
 * @returns {*}
 */
export function getDashboardStudies(filterQuery, filterResults) {

    /* Filter studies by dataset search, if applicable. */
    return DashboardService.filterStudiesBySearchResults(DashboardStudyStaticQuery(), filterQuery, filterResults);
}
