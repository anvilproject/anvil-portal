/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for dashboard data.
 */

/**
 * Returns the dashboard entities filtered by results from the search.
 *
 * @param entities
 * @param setOfResults
 * @param resultKey
 * @returns {*}
 */
export function filterDashboardEntities(entities, setOfResults, resultKey) {
  /* Set of results is empty. */
  if (setOfResults.size === 0) {
    return [];
  }

  if (entities) {
    return entities.filter(entity => setOfResults.has(entity[resultKey]));
  }

  return [];
}

/**
 * Returns true if the value is an array.
 *
 * @param value
 */
export function isArray(value) {
  return Array.isArray(value);
}
