/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting data dashboard summary into FE model.
 */

// App dependencies
import * as DashboardService from "./dashboard.service";
import {DashboardWorkspaceStaticQuery} from "../../hooks/dashboard-workspace-query";

/**
 * Returns the dashboard summary filtered by results from the search, if applicable,
 * and then by "consortia", "dbgap" or "public" [shared].
 *
 * @param consortia
 * @param dbgap
 * @param filterResults
 * @param resultsExist
 * @param shared
 * @returns {Array.<*>}
 */
export function getDashboardSummary(consortia, dbgap, filterResults, resultsExist, shared) {

    if ( !resultsExist ) {

        return [];
    }

    /* Filter workspaces by dataset search, if applicable. */
    const workspaces = DashboardService.filterWorkspacesBySearchResults(DashboardWorkspaceStaticQuery(), filterResults);

    /* Filter workspaces by accessibility. */
    const workspacesByAccessibility = DashboardService.filterDataByDBGapReadiness(workspaces, consortia, dbgap, shared);

    const summary = buildDashboardSummary(workspacesByAccessibility);
    const summaryTotals = buildDashboardSummaryTotals(summary);

    return summary.concat(summaryTotals);
}

/**
 * Parse the dashboard JSON and build up FE-compatible model of data dashboard summary, to be displayed on the dashboard page.
 *
 * @param workspaces
 * @returns {Array}
 */
function buildDashboardSummary(workspaces) {

    const consortia = setOfConsortia(workspaces);

    return [...consortia].map(consortium => {

        const workspacesByConsortium = filterWorkspacesByConsortium(workspaces, consortium);

        return {
            cohorts: countCohorts(workspacesByConsortium),
            consortium: consortium,
            files: sumFiles(workspacesByConsortium),
            samples: sumSamples(workspacesByConsortium),
            sizeTB: calculateSize(workspacesByConsortium),
            subjects: sumSubjects(workspacesByConsortium)
        }
    });
}

/**
 * Returns the dashboard summary total counts.
 *
 * @param summary
 * @returns {{cohorts: *, consortium: string, files: *, samples: *, sizeTB: *, subjects: *}}
 */
function buildDashboardSummaryTotals(summary) {

    return {
        cohorts: totalCohorts(summary),
        consortium: "Total",
        files: totalFiles(summary),
        samples: totalSamples(summary),
        sizeTB: totalSize(summary),
        subjects: totalSubjects(summary)
    }
}

/**
 * Returns the total size.
 */
function calculateSize(data) {

    return data.reduce((accum, project) => {

        accum += project.size;
        return accum;
    }, 0);
}

/**
 * Returns the number of cohorts.
 * @param data
 */
function countCohorts(data) {

    return data.length;
}

/**
 * Filter the projects by the specified consortium.
 *
 * @param workspaces
 * @param consortium
 */
function filterWorkspacesByConsortium(workspaces, consortium) {

    return workspaces.filter(workspace => workspace.consortium === consortium);
}

/**
 * Returns the total sum of the specified summary type.
 *
 * @param data
 * @param type
 * @returns {*}
 */
function reduceSummaryByType(data, type) {

    return data.reduce((accum, summary) => {
        accum += summary[type];
        return accum;
    }, 0);
}

/**
 * Returns the set of consortia.
 *
 * @param data
 * @returns {Set}
 */
function setOfConsortia(data) {

    return new Set(data.map(project => project.consortium));
}

/**
 * Counts the total number of files.
 *
 * @param data
 */
function sumFiles(data) {

    return sumProjectFileValues(data);
}

/**
 * Sum the file value, for the group of projects.
 *
 * @param data
 * @returns {*}
 */
function sumProjectFileValues(data) {

    return data.reduce((projectAccum, project) => {

        projectAccum += project.files;
        return projectAccum;
    }, 0);
}

/**
 * Sum the node value for the specified type, for the group of projects.
 */
function sumProjectNodeValues(data, nodeType) {

    return data.reduce((projectAccum, project) => {

        projectAccum += project[nodeType];
        return projectAccum;
    }, 0);
}

/**
 * Counts the total number of samples.
 */
function sumSamples(data) {

    return sumProjectNodeValues(data, "samples");
}

/**
 * Counts the total number of subjects.
 */
function sumSubjects(data) {

    return sumProjectNodeValues(data, "subjects");
}

/**
 * Returns the total number of cohorts for all consortia.
 *
 * @param summary
 * @returns {*}
 */
function totalCohorts(summary) {

    return reduceSummaryByType(summary, "cohorts");
}

/**
 * Returns the total number of files for all consortia.
 *
 * @param summary
 * @returns {*}
 */
function totalFiles(summary) {

    return reduceSummaryByType(summary, "files");
}

/**
 * Returns the total number of samples for all consortia.
 *
 * @param summary
 * @returns {*}
 */
function totalSamples(summary) {

    return reduceSummaryByType(summary, "samples");
}

/**
 * Returns the total number of sizes for all consortia.
 *
 * @param summary
 * @returns {*}
 */
function totalSize(summary) {

    return reduceSummaryByType(summary, "sizeTB");
}

/**
 * Returns the total number of subjects for all consortia.
 *
 * @param summary
 * @returns {*}
 */
function totalSubjects(summary) {

    return reduceSummaryByType(summary, "subjects");
}
