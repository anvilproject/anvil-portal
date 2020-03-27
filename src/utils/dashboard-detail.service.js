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
            demographics: getDemographicsCount(project),
            diagnosis: getDiagnosisCount(project),
            families: getFamiliesCount(project),
            files: sumFileValues(project.files),
            dbGapId: project.dbGAP_project_id,
            program: switchProgramName(project.source),
            projectId: project.project_id,
            samples: getSamplesCount(project),
            size: formatFileSize(project.size),
        }
    });
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

/**
 * Returns the corresponding program display name.
 *
 * @param program
 * @returns {*}
 */
function switchProgramName(program) {

    switch (program) {
        case "GTEx":
            return "GTEx (v8)";
        case "ThousandGenomes":
            return "1000 Genomes";
        default:
            return program;
    }
}
