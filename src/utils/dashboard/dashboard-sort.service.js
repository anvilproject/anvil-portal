/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for sorting dashboard data.
 */

/**
 * Sorts the terms.
 *
 * @param terms
 * @returns {*}
 */
export function sortTerms(terms) {
  return terms.sort(function (term0, term1) {
    return compareDataValues(term0, term1);
  });
}

/**
 * A simple comparison between two variables, returning a value to indicate an order of the variables in relation to each other.
 * Used by the sort function.
 *
 * @param value0
 * @param value1
 * @returns {number}
 */
function compareDataValues(value0, value1) {
  const v0 = removeNonAlphanumericValues(value0);
  const v1 = removeNonAlphanumericValues(value1);

  if (v0 < v1) {
    return -1;
  }

  if (v0 > v1) {
    return 1;
  }

  return 0;
}

/**
 * Returns a lower case string, comprising of non alpha characters.
 *
 * @param str
 * @returns {string}
 */
function removeNonAlphanumericValues(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s\s+/g, "")
    .trim();
}
