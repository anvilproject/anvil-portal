/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting data dashboard detail into FE model.
 */

import * as NumberFormatService from "./number-format.service";

/**
 * Parse the dashboard JSON and build up FE-compatible model of data dashboard detail, to be displayed on the dashboard page.
 */
export function getDashboardDetail(data) {

    return data.projects.map(project => {

        return {
            access: formatAccess(project.public),
            dataType: project.data_type,
            demographics: getDemographicsCount(project),
            diagnosis: getDiagnosisCount(project),
            families: getFamiliesCount(project),
            files: sumFileValues(project.files),
            dbGapId: project.dbGAP_project_id,
            program: project.source,
            projectId: project.project_id,
            samples: getSamplesCount(project),
            size: formatFileSize(project.size),
        }
    });
}

/**
 * Sorts the dashboard detail data, first by program "Consortium", then by projectId "Terra Workspace Name".
 *
 * @param dashboardData
 */
export function sortDashboardDetail(dashboardData) {

    return dashboardData.sort(function (a, b) {

        const programA = removeIgnorableCharacters(a.program);
        const programB = removeIgnorableCharacters(b.program);

        /* Sort by program. */
        const programSort = compareOrderOfAWithB(programA, programB);

        /* If program is the same, sort by projectId and return the sorted outcome. */
        if ( programSort === 0 ) {

            const projectIdA = removeIgnorableCharacters(a.projectId);
            const projectIdB = removeIgnorableCharacters(b.projectId);

            return compareOrderOfAWithB(projectIdA, projectIdB)
        }

        /* Return the program sorted outcome. */
        return programSort;
    });
}

/**
 * A simple comparison between two variables, returning a value to indicate an order of the variables in relation to each other.
 * Used by the sort function.
 *
 * @param a
 * @param b
 * @returns {number}
 */
function compareOrderOfAWithB(a, b) {

    if ( a < b ) {

        return -1;
    }

    if ( a > b) {

        return 1;
    }

    return 0;
}

/**
 * Find the project node by the specified type.
 */
function findProjectNodeByType(project, type) {

    return project.nodes.find(node => node.type === type) || {};
}

/**
 * Converts the public data boolean value into a corresponding "Public" or "Private" string value.
 *
 * @param boolean
 * @returns {string}
 */
function formatAccess(boolean) {

    if ( boolean === true ) {

        return "Public";
    }
    else {

        return "Private";
    }
}

/**
 * Returns file size in TB, formatted to two decimal places.
 *
 * @param size
 * @returns {string}
 */
function formatFileSize(size) {

    return NumberFormatService.formatSizeToTB(size);
}

/**
 * Returns the demographics count.
 */
function getDemographicsCount(project) {

    return findProjectNodeByType(project, "Demographic").count;
}

/**
 * Returns the diagnosis count.
 */
function getDiagnosisCount(project) {

    return findProjectNodeByType(project, "Diagnosis").count;
}

/**
 * Returns the families count.
 */
function getFamiliesCount(project) {

    return findProjectNodeByType(project, "Family").count;
}

/**
 * Returns the samples count.
 */
function getSamplesCount(project) {

    return findProjectNodeByType(project, "Sample").count;
}

/**
 * Removes ignorable characters of the specified string and returns the string converted into lower case.
 *
 * @param str
 * @returns {string}
 */
function removeIgnorableCharacters(str) {

    return str.replace(/-/g, "").toLowerCase();
}

/**
 * Sum the file counts.
 *
 * @param files
 * @returns {*}
 */
function sumFileValues(files) {

    return files.reduce((accum, file) => {
        accum += file.count;
        return accum;
    }, 0);
}
