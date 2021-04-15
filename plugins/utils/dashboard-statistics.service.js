/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting AnVIL statistics into FE model.
 */

// Template variables
const WORKSPACE_FIELD_KEY = {
    "CONSORTIUM": "consortium",
    "SAMPLES": "samples",
    "SIZE": "size",
    "SUBJECTS": "subjects",
};

/**
 * Parse the stats JSON and build up FE-compatible model of stats, to be displayed on home page.
 *
 * @param workspaces
 * @returns {{cohorts, consortia: number, samples, size, subjects}}
 */
const buildStats = function buildStats(workspaces) {

    return {
        cohorts: countCohorts(workspaces),
        consortia: countConsortia(workspaces),
        samples: sumSamples(workspaces),
        size: sumSize(workspaces),
        subjects: sumSubjects(workspaces)
    };
};

/**
 * Returns the total number of workspaces.
 */
function countCohorts(workspaces) {

    return workspaces.length;
}

/**
 * Counts the total number of consortium.
 *
 * @param workspaces
 * @returns {number}
 */
function countConsortia(workspaces) {

    const consortia = new Set(workspaces.map(workspace => workspace[WORKSPACE_FIELD_KEY.CONSORTIUM]));

    return consortia.size;
}

/**
 * Sum the node value for the specified type, across all workspaces.
 *
 * @param workspaces
 * @param nodeType
 */
function sumWorkspaceNodeValues(workspaces, nodeType) {

    return workspaces.reduce((workspaceAccum, workspace) => {

        workspaceAccum += workspace[nodeType];
        return workspaceAccum;
    }, 0);
}

/**
 * Counts the total number of samples.
 */
function sumSamples(workspaces) {

    return sumWorkspaceNodeValues(workspaces, WORKSPACE_FIELD_KEY.SAMPLES);
}

/**
 * Returns the total size.
 *
 * @param workspaces
 */
function sumSize(workspaces) {

    return sumWorkspaceNodeValues(workspaces, WORKSPACE_FIELD_KEY.SIZE);
}

/**
 * Counts the total number of subjects.
 *
 * @param workspaces
 */
function sumSubjects(workspaces) {

    return sumWorkspaceNodeValues(workspaces, WORKSPACE_FIELD_KEY.SUBJECTS);
}

module.exports.buildStats = buildStats;
