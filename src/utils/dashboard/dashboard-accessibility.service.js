/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for filtering dashboard data by dbGap availability.
 */

// App dependencies
import {BLACKLIST_DBGAPIDS} from "./blacklist-db-gap-ids";

/**
 * Returns a filtered set of dashboard data, specified by dbGapId availability.
 *
 * @param dashboardData
 * @param dbGapAccessible
 * @returns {*}
 */
export function filterDataByDBGapReadiness(dashboardData, dbGapAccessible) {

    /* An undefined value will build an unfiltered table, and returns all data. */
    if ( !dbGapAccessible || !dashboardData ) {

        return dashboardData.projects;
    }

    /* Determine the type of table to be built, specified by the availability of dbGapId. */
    /* All public data will return with the accessible dbGapId data as "readiness data". */
    /* A true accessible value will return data with accessible dbGapIds as "readiness data". */
    /* A false accessible value will return data without dbGapIds (blacklisted dbGapIds), or inaccessible dbGapIds as "coming soon data". */
    const showReadinessData = JSON.parse(dbGapAccessible);

    return dashboardData.projects.filter(data => {

        const dbGapBlacklisted = BLACKLIST_DBGAPIDS.includes(data.dbGAP_study_id);
        const dbGapExists = !!data.dbGAP_study_id;

        if ( showReadinessData ) {

            if ( data.public ) {

                return true;
            }

            return dbGapExists && !dbGapBlacklisted;
        }
        else {

            if ( data.public ) {

                return false;
            }

            return !dbGapExists || dbGapBlacklisted;
        }
    });
}
