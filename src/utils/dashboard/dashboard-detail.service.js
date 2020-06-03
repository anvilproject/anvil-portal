/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting data dashboard detail into FE model.
 */

// App dependencies
import * as DashboardAccessibilityService from "./dashboard-accessibility.service";
import * as DashboardSortService from "./dashboard-sort.service";
import {DashboardStaticQuery} from "../../hooks/dashboard-query";
import * as NumberFormatService from "../number-format.service";

/**
 * Returns the formatted dashboard detail JSON.
 *
 */
export function getDashboardDetail(dbGapAccessible) {

    /* Filter the raw query by db gap readiness. */
    const dashboardByAccessibility = DashboardAccessibilityService.filterDataByDBGapReadiness(DashboardStaticQuery(), dbGapAccessible);

    /* Build up the FE-compatible model. */
    const details = buildDashboardDetail(dashboardByAccessibility);

    /* Return the sorted dashboard. */
    return DashboardSortService.sortDataByDuoTypes(details, "program", "projectId");
}

/**
 * Parse the dashboard JSON and build up FE-compatible model of data dashboard detail, to be displayed on the dashboard page.
 */
function buildDashboardDetail(data) {

    return data.map(project => {

        return {
            access: formatAccess(project.public),
            dataType: project.data_type,
            demographics: getDemographicsCount(project),
            diagnosis: getDiagnosisCount(project),
            families: getFamiliesCount(project),
            files: sumFileValues(project.files),
            dbGapId: project.dbGAP_study_id,
            dbGapIdAccession: project.dbGAP_acession,
            program: project.source,
            projectId: project.project_id,
            samples: getSamplesCount(project),
            size: formatFileSize(project.size),
            subjects: getSubjectsCount(project)
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
 * @param project
 */
function getDemographicsCount(project) {

    return findProjectNodeByType(project, "Demographic").count;
}

/**
 * Returns the diagnosis count.
 * @param project
 */
function getDiagnosisCount(project) {

    return findProjectNodeByType(project, "Diagnosis").count;
}

/**
 * Returns the families count.
 * @param project
 */
function getFamiliesCount(project) {

    return findProjectNodeByType(project, "Family").count;
}

/**
 * Returns the samples count.
 * @param project
 */
function getSamplesCount(project) {

    return findProjectNodeByType(project, "Sample").count;
}

/**
 * Returns the subjects count.
 * @param project
 */
function getSubjectsCount(project) {

    return findProjectNodeByType(project, "Subject").count;
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
