/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting data dashboard summary into FE model.
 */

/**
 * Returns the dashboard summary.
 *
 * @param entities
 * @param entityKey
 * @returns {*}
 */
export function getDashboardSummary(entities, entityKey) {

    if ( entities.length === 0 ) {

        return [];
    }

    const summary = buildDashboardSummary(entities, entityKey);
    const summaryTotals = buildDashboardSummaryTotals(summary);

    return summary.concat(summaryTotals);
}

/**
 * Parse the dashboard JSON and build up FE-compatible model of data dashboard summary, to be displayed on the dashboard page.
 *
 * @param entities
 * @param entityKey
 * @returns {Array}
 */
function buildDashboardSummary(entities, entityKey) {

    const setOfSummaryTerms = getSetOfSummaryTerms(entities, entityKey);

    return [...setOfSummaryTerms].map(term => {

        const filteredEntities = filterEntitiesByTerm(entities, term, entityKey);

        return {
            cohorts: countCohorts(filteredEntities),
            consortium: term,
            files: sumFiles(filteredEntities),
            samples: sumSamples(filteredEntities),
            sizeTB: calculateSize(filteredEntities),
            subjects: sumSubjects(filteredEntities)
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
 * Filter the entities by the specified term.
 *
 * @param entities
 * @param term
 * @param entityKey
 */
function filterEntitiesByTerm(entities, term, entityKey) {

    return entities.filter(entity => entity[entityKey] === term);
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
 * Returns the set of terms for the specified entity element.
 *
 * @param entities
 * @param entityKey
 * @returns {Set}
 */
function getSetOfSummaryTerms(entities, entityKey) {

    return new Set(entities.map(entity => entity[entityKey]));
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
