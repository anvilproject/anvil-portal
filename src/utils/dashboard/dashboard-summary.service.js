/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting data dashboard summary into FE model.
 */

// App dependencies
import { DashboardSummarySnapshotPluralPropertyNameDisplay } from "./dashboard-summary-snapshot-plural-property-name-display.model";
import { DashboardSummarySnapshotSingularPropertyNameDisplay } from "./dashboard-summary-snapshot-singular-property-name-display.model";
import * as DashboardTableService from "./dashboard-table.service";

/**
 * Returns the search summary snapshot.
 *
 * @param summaries
 * @param summaryKeys
 * @returns {Array}
 */
export function getDashboardSnapshotSummary(summaries, summaryKeys) {
  if (summaries && summaries.length > 0) {
    const totalRow = summaries.slice(-1).find((t) => t);
    const summaryRows = summaries.slice(0, -1);

    return summaryKeys.map((key, k) => {
      /* Grab the count. */
      const count =
        k === 0 ? summaryRows.length.toLocaleString() : totalRow[key];
      /* Format the count. */
      const countDisplayValue = DashboardTableService.formatValue(count, key);

      /* Grab the label. */
      const label =
        count > 1
          ? DashboardSummarySnapshotPluralPropertyNameDisplay[key]
          : DashboardSummarySnapshotSingularPropertyNameDisplay[key];

      /* Return the label and count display value. */
      return { count: countDisplayValue, label: label };
    });
  }

  return [];
}

/**
 * Returns the dashboard summary.
 *
 * @param entities
 * @param entityKey
 * @param entityKeys
 * @param setOfSummaryTerms
 * @returns {*}
 */
export function getDashboardSummary(
  entities,
  entityKey,
  entityKeys,
  setOfSummaryTerms
) {
  if (entities.length === 0) {
    return [];
  }

  /* Some summary "terms" may share the same data, but in summarization we separate them out as their own line item. */
  /* Summary counts may be duplicated in this instance. */
  /* The summary totals are correct and calculated from the resulting entities, rather than the summary counts. */
  const summary = buildDashboardSummary(
    entities,
    entityKey,
    entityKeys,
    setOfSummaryTerms
  );
  const summaryTotals = buildDashboardSummaryTotals(
    entities,
    entityKey,
    entityKeys
  );

  return summary.concat(summaryTotals);
}

/**
 * Parse the dashboard JSON and build up FE-compatible model of data dashboard summary, to be displayed on the dashboard page.
 *
 * @param setOfTerms
 * @param entities
 * @param entityKey
 * @param entityKeys
 * @returns {Array}
 */
function buildDashboardSummary(entities, entityKey, entityKeys, setOfTerms) {
  return [...setOfTerms].map((term) => {
    const filteredEntities = filterEntitiesByTerm(entities, entityKey, term);

    return entityKeys.reduce((acc, key) => {
      const object = {
        [key]: getObjectSummaryDisplayValue(
          filteredEntities,
          entityKey,
          key,
          term
        ),
      };
      acc = Object.assign(acc, object);

      return acc;
    }, {});
  });
}

/**
 * Returns the dashboard summary total counts.
 *
 * @param entities
 * @param entityKey
 * @param entityKeys
 * @returns {{cohorts: *, consortium: string, files: *, samples: *, sizeTB: *, subjects: *}}
 */
function buildDashboardSummaryTotals(entities, entityKey, entityKeys) {
  return entityKeys.reduce((acc, key) => {
    const object = { [key]: getObjectSummaryTotal(entities, entityKey, key) };
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
 * @param entityKey
 * @param term
 */
function filterEntitiesByTerm(entities, entityKey, term) {
  return entities.filter((entity) => {
    /* Handle case entity is an array of values. */
    /* Duplicate entities are possible in this scenario. */
    /* e.g. A combo platform "AnVIL, BioData Catalyst" share the same study. */
    /* In this instance, we count the study and it's associated summary counts (subjects) twice. */
    /* i.e. The count will be allocated to both the "AnVIL" and "BioData Catalyst" platform. */
    /* For the summary count, we wish to capture if the term (string) exists within the entity's corresponding object (of type array). */
    /* i.e. we filter for the term "AnVIL" in an entity where platform could be ["AnVIL"] or ["AnVIl", "BioData Catalyst"]. */
    if (Array.isArray(entity[entityKey])) {
      return entity[entityKey].indexOf(term) >= 0;
    }

    return entity[entityKey] === term;
  });
}

/**
 * Returns the objects count or display value for the specified summary key.
 *
 * @param entities
 * @param entityKey
 * @param key
 * @param term
 * @returns {*}
 */
function getObjectSummaryDisplayValue(entities, entityKey, key, term) {
  /* Handle case key is the selected summary key. */
  /* e.g. AnVIL summary key is "consortium"; return the consortium value to display as a summary item like "1000 Genomes". */
  if (key === entityKey) {
    return term;
  }

  return getObjectTotal(entities, key);
}

/**
 * Returns the key's summary total.
 *
 * @param entities
 * @param entityKey
 * @param key
 * @returns {string}
 */
function getObjectSummaryTotal(entities, entityKey, key) {
  if (key === entityKey) {
    return "Totals";
  }

  return getObjectTotal(entities, key);
}

/**
 * Returns either a count or node total for the specified object (key).
 *
 * @param entities
 * @param key
 */
function getObjectTotal(entities, key) {
  /* Handle case key is the count associated with the selected summary key. */
  /* e.g. AnVIL summary key is "consortium"; returns the count of "cohorts" for the specified consortium like "1000 Genomes". */
  if (key === "cohorts" || key === "studies") {
    return countEntities(entities);
  }

  return sumEntityNodeValues(entities, key);
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
