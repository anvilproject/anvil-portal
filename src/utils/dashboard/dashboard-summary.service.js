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
 * @param entityKeys
 * @returns {*}
 */
export function getDashboardSummary(entities, entityKey, entityKeys) {

    if ( entities.length === 0 ) {

        return [];
    }

    const summary = buildDashboardSummary(entities, entityKey, entityKeys);
    const summaryTotals = buildDashboardSummaryTotals(summary, entityKey, entityKeys);

    return summary.concat(summaryTotals);
}

/**
 * Parse the dashboard JSON and build up FE-compatible model of data dashboard summary, to be displayed on the dashboard page.
 *
 * @param entities
 * @param entityKey
 * @param entityKeys
 * @returns {Array}
 */
function buildDashboardSummary(entities, entityKey, entityKeys) {

    const setOfSummaryTerms = getSetOfSummaryTerms(entities, entityKey);

    return [...setOfSummaryTerms].map(term => {

        const filteredEntities = filterEntitiesByTerm(entities, term, entityKey);

        return entityKeys.reduce((acc, key) => {

            const object = {[key]: getObjectSummaryDisplayValue(key, entityKey, term, filteredEntities)};
            acc = Object.assign(acc, object);

            return acc;
        }, {});
    });
}

/**
 * Returns the dashboard summary total counts.
 *
 * @param summary
 * @param entityKey
 * @param entityKeys
 * @returns {{cohorts: *, consortium: string, files: *, samples: *, sizeTB: *, subjects: *}}
 */
function buildDashboardSummaryTotals(summary, entityKey, entityKeys) {

    return entityKeys.reduce((acc, key) => {

        const object = {[key]: getObjectSummaryTotal(key, entityKey, summary)};
        acc = Object.assign(acc, object);

        return acc;
    }, {});
}

/**
 * Returns the number of entities.
 *
 * @param entities
 */
function countEntities(entities) {

    return entities.length;
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
 * Returns the objects count or display value for the specified summary key.
 *
 * @param key
 * @param entityKey
 * @param term
 * @param entities
 * @returns {*}
 */
function getObjectSummaryDisplayValue(key, entityKey, term, entities) {

    /* Handle case key is the selected summary key. */
    /* e.g. AnVIL summary key is "consortium"; return the consortium value to display as a summary item like "1000 Genomes". */
    if ( key === entityKey ) {

        return term;
    }
    /* Handle case key is the count associated with the selected summary key. */
    /* e.g. AnVIL summary key is "consortium"; returns the count of "cohorts" for the specified consortium like "1000 Genomes". */
    else if ( key === "cohorts" || key === "studies" ) {

        return countEntities(entities);
    }

    /* Return the sum of node values for the key. */
    return sumEntityNodeValues(entities, key);
}

/**
 * Returns the key's summary total.
 *
 * @param key
 * @param entityKey
 * @param summary
 * @returns {string}
 */
function getObjectSummaryTotal(key, entityKey, summary) {

    if ( key === entityKey ) {

        return "Total";
    }

    return sumEntityNodeValues(summary, key);
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
 * Sum the node value for the specified type, for the specified entities.
 *
 * @param entities
 * @param nodeType
 */
function sumEntityNodeValues(entities, nodeType) {

    return entities.reduce((entityAccum, entity) => {

        entityAccum += entity[nodeType];
        return entityAccum;
    }, 0);
}
