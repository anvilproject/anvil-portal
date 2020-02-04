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
        projects: countProjects(data),
        samples: sumSamples(data),
        size: calculateSize(data),
        sources: countSources(data),
        subjects: sumSubjects(data)
    };
}

/**
 * Returns the total size.
 */
function calculateSize(data) {

    return data.projects.reduce((accum, project) => {

        accum += project.size;
        return accum;
    }, 0);
}

/**
 * Returns the total number of projects.
 */
function countProjects(data) {

    return data.projects.length;
}

/**
 * Counts the total number of sources - sum unique project.source
 */
function countSources(data) {

    const sources = data.projects.map(project => project.source);
    return new Set(sources).size;
}

/**
 * Filter the project nodes by the specified type.
 */
function filterProjectNodesByType(project, type) {

    return project.nodes.filter(node => node.type === type) || [];
}

/**
 * Sum the specified node counts.
 */
function sumNodeValues(nodes) {

    return nodes.reduce((accum,  node) => {
        accum += node.count;
        return accum;
    }, 0);
}

/**
 * Sum the node value for the specified type, across all projects.
 */
function sumProjectNodeValues(data, nodeType) {

    return data.projects.reduce((projectAccum, project) => {

        projectAccum += sumNodeValues(filterProjectNodesByType(project, nodeType));
        return projectAccum;
    }, 0);
}

/**
 * Counts the total number of samples.
 */
function sumSamples(data) {

    return sumProjectNodeValues(data, "Sample");
}

/**
 * Counts the total number of subjects.
 */
function sumSubjects(data) {

    return sumProjectNodeValues(data, "Subject");
}
