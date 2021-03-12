/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting stats into FE model.
 */

/**
 * Parse the stats JSON and build up FE-compatible model of stats, to be displayed on home page.
 */
export function getStats(data) {

    return {
        cohorts: countCohorts(data),
        consortia: countConsortia(data),
        samples: sumSamples(data),
        size: sumSize(data),
        subjects: sumSubjects(data)
    };
}

/**
 * Returns the total number of projects.
 */
function countCohorts(data) {

    return data.length;
}

/**
 * Counts the total number of consortium.
 */
function countConsortia(data) {

    const consortia = new Set(data.map(project => project.consortium));

    return consortia.size;
}

/**
 * Sum the node value for the specified type, across all projects.
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
 * Returns the total size.
 */
function sumSize(data) {

    return sumProjectNodeValues(data, "size");
}

/**
 * Counts the total number of subjects.
 */
function sumSubjects(data) {

    return sumProjectNodeValues(data, "subjects");
}
