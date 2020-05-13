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

    return dashboardData.sort(function (data0, data1) {

        const program0 = convertToSortableValue(data0.program);
        const program1 = convertToSortableValue(data1.program);

        /* Sort by program. */
        const programSort = sortDataValue(program0, program1);

        /* If program is the same, sort by projectId and return the sorted outcome. */
        if ( programSort === 0 ) {

            const projectId0 = convertToSortableValue(data0.projectId);
            const projectId1 = convertToSortableValue(data1.projectId);

            return sortDataValue(projectId0, projectId1)
        }

        /* Return the program sorted outcome. */
        return programSort;
    });
}

/**
 * A simple comparison between two variables, returning a value to indicate an order of the variables in relation to each other.
 * Used by the sort function.
 *
 * @param value0
 * @param value1
 * @returns {number}
 */
function sortDataValue(value0, value1) {

    if ( value0 < value1 ) {

        return -1;
    }

    if ( value0 > value1) {

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
 * Removes characters of the specified string to be ignored during sort and returns the string converted into lower case.
 *
 * @param str
 * @returns {string}
 */
function convertToSortableValue(str) {

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
