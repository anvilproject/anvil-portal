/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting data dashboard detail into FE model.
 */

import * as NumberFormatService from "./number-format.service";

let GAP_IDS_UNDEFINED_STUDY_ACCESSION = ["phs001155", "phs001642", "phs001222", "phs001601", "phs001543", "phs001547", "phs001579", "phs001544", "phs001676", "phs001624", "phs001545", "phs001894", "phs001569", "phs001506", "phs001600", "phs001766", "phs001913"];

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
            dbGapId: removeGapIdUndefinedStudyAccession(project.dbGAP_project_id),
            program: project.source,
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
 * Returns a null value if there is no corresponding study accession for the specified gap id.
 *
 * @param gapId
 * @returns {null}
 */
function removeGapIdUndefinedStudyAccession(gapId) {

    const isGapIdInvalid = GAP_IDS_UNDEFINED_STUDY_ACCESSION.includes(gapId);

    return isGapIdInvalid ? null : gapId;
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
