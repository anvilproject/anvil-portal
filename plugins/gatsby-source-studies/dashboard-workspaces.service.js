/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting workspaces into FE model.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {sortDataByDuoTypes} = require(path.resolve(__dirname, "./dashboard-sort.service.js"));
const {formatSizeToTB} = require(path.resolve(__dirname, "./number-format.service.js"));

// Template variables
const statsJson = require(path.resolve(__dirname, "../../../client-apis/pyAnVIL/notebooks/figures/report-data.json"));

/**
 * Returns the formatted workspaces JSON.
 *
 */
const getWorkspaces = async function getWorkspaces() {

    const projects = statsJson.projects;

    /* Build up the FE-compatible model. */
    const workspaces = buildDashboardWorkspace(projects);

    /* Validate filtered workspaces. */
    validateWorkspacesFiltering(workspaces);

    /* Return the sorted dashboard. */
    return sortDataByDuoTypes(workspaces, "program", "projectId");
};

/**
 * Parse the dashboard JSON and build up FE-compatible model of workspaces, to be displayed on the dashboard page.
 *
 * @param projects
 */
function buildDashboardWorkspace(projects) {

    return projects.map(project => {

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
            size: project.size,
            sizeTB: formatFileSize(project.size),
            subjects: getSubjectsCount(project)
        }
    });
}

/**
 * Find the project node by the specified type.
 *
 * @param project
 * @param type
 * @returns {{}}
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

    return formatSizeToTB(size);
}

/**
 * Returns the demographics count.
 *
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

/**
 * Logs an error in the build process if the sum of filtered workspaces does not equal the total number of workspaces.
 *
 * @param workspaces
 */
function validateWorkspacesFiltering(workspaces) {

    /* Consortia. */
    const workspacesByConsortiaCount = workspaces.filter(workspace => {

        const dbGapExists = !!workspace.dbGapIdAccession;

        /* Prop "consortia" - return all private workspaces without a dbGapId accession. */
        return ( workspace.access === "Private" ) && !dbGapExists;
    }).length;

    /* Public. */
    const workspacesByPublicCount = workspaces.filter(workspace => {

        const dbGapExists = !!workspace.dbGapIdAccession;

        /* Prop "public" - return all public workspaces without a dbGapId accession. */
        return ( workspace.access === "Public" ) && !dbGapExists;
    }).length;

    /* dbGapId accessible. */
    const workspaceByAvailabilityCount = workspaces.filter(workspace => {

        return !!workspace.dbGapIdAccession;
    }).length;

    if ( workspaceByAvailabilityCount + workspacesByConsortiaCount + workspacesByPublicCount !== workspaces.length ) {

        console.log("Error - workspaces filtering invalid.")
    }

}

module.exports.getWorkspaces = getWorkspaces;
