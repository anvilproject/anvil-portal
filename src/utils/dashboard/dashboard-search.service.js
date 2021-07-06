/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Services data dashboard search.
 */

// Template variables
const regexSpecialChars = /[^a-zA-Z0-9\s]/g;
const DENY_LIST_TERMS = [
  "ATTRIBUTEVALUE",
  "NOT APPLICABLE",
  "N/A",
  "NA",
  "--",
  "",
  null
];

/**
 * Returns the search checkboxes, grouped by columns.
 * Facilitates the display of the checkboxes into columns, organised by alpha from top to bottom, left to right.
 *
 * @param checkboxes
 * @param maxColumns
 * @returns {Array}
 */
export function getDashboardCheckboxColumns(checkboxes, maxColumns) {
  if (checkboxes) {
    /* Calculate the max number of displayable rows per column. */
    const maxRows = Math.ceil(checkboxes.length / maxColumns);

    /* Return the checkboxes, regrouped into each column. */
    return Array.from({ length: maxColumns }).map((col, c) => {
      const startSlice = c * maxRows;
      const endSlice = (c + 1) * maxRows;

      return checkboxes.slice(startSlice, endSlice);
    });
  }

  return [];
}

/**
 * Returns the maximum number of checkboxes displayed for the dashboard search quick pick.
 * Additional checkboxes are displayed via the "+ x more" modal.
 *
 * @param setOfSummaryKeyTerms
 * @returns {number}
 */
export function getDashboardCheckboxMaxDisplayCount(setOfSummaryKeyTerms) {
  /* Grab the total number of terms for the summary facet. */
  const sizeSummaryKeyTerms = setOfSummaryKeyTerms.size;

  if (sizeSummaryKeyTerms > 4) {
    return 4;
  }

  return sizeSummaryKeyTerms;
}

/**
 * Returns the facet selector more count for the specified facet.
 * Excludes the terms already on display in the search panel.
 * Excludes any terms selected with a zero count.
 *
 * @param terms
 * @param snippetCount
 * @returns {number}
 */
export function getDashboardCheckboxMoreCount(terms, snippetCount) {
  /* Count the remaining terms available for selection. */
  return terms.slice(snippetCount).filter(term => term.count).length;
}

/**
 * Returns the entire set of entities for the result key.
 *
 * @param entities
 * @param resultKey
 * @returns {Set<any>}
 */
export function getDashboardSetOfEntities(entities, resultKey) {
  return new Set(entities.map(entity => entity[resultKey]));
}

/**
 * Returns a map object of set of terms by facet.
 *
 * @param entities
 * @param facets
 * @returns {Map<any, any>}
 */
export function getDashboardSetOfTermsByFacet(entities, facets) {
  /* Init setOfTermsByFacet and the setOfTerms for each facet. */
  const setOfTermsByFacet = new Map();
  facets.forEach(facet => setOfTermsByFacet.set(facet, new Set()));

  /* Grab all possible terms for each facet, from the entities. */
  for (const entity of entities) {
    for (const facet of facets) {
      /* Grab the set of terms and the entity value for the specified facet. */
      const setOfTerms = setOfTermsByFacet.get(facet);
      const value = entity[facet];

      /* Handle case where term is not an array - make a single term an array of single length. */
      const terms = Array.isArray(value) ? value : Array.of(value);

      /* Add to the set of terms. */
      terms.forEach(term => {
        if (isTermAllowed(term)) {
          setOfTerms.add(term);
        }
      });
    }
  }
  setOfTermsByFacet.set("search", new Set());

  return setOfTermsByFacet;
}

/**
 * Returns the count for the specified term.
 *
 * @param facet
 * @param term
 * @param entities
 */
export function getDashboardTermCount(facet, term, entities) {
  return entities.reduce((acc, entity) => {
    if (Array.isArray(entity[facet])) {
      entity[facet].forEach(ef => {
        if (ef === term) {
          acc++;
        }
      });
    } else {
      if (entity[facet] === term) {
        acc++;
      }
    }

    return acc;
  }, 0);
}

/**
 * Returns a map object of term search value by term display where
 * - term display is the term value
 * - term search value is the term value, with white space, hyphens or brackets or slash are changed to an underscore.
 * e.g. "GTEx (v8)" returns "GTEx__v8_".
 *
 * @param setOfTermsByFacet
 * @returns {Map}
 */
export function getDashboardTermSearchValueByTerm(setOfTermsByFacet) {
  /* Init termSearchValueByTerm. */
  const termSearchValueByTerm = new Map();

  /* For each facet, grab the setOfTerms. */
  for (const setOfTerms of [...setOfTermsByFacet.values()]) {
    /* For each term, add the key-value pair of term and term search value. */
    for (const term of [...setOfTerms]) {
      /* Replace any white space, commas, hyphens or brackets with an underscore. */
      const termSearchValue = term
        .toLowerCase()
        .replace(regexSpecialChars, "_")
        .replace(/\s/g, "_");

      termSearchValueByTerm.set(term, termSearchValue);
    }
  }

  return termSearchValueByTerm;
}

/**
 * Returns true, if the number of facets is odd and greater than four.
 * @param facetCount
 * @returns {boolean|number}
 */
export function isDashboardCheckboxesUneven(facetCount) {
  return facetCount > 4 && facetCount % 2 === 1;
}

/**
 * Returns true if the term is allowable.
 *
 * @param term
 */
function isTermAllowed(term) {
  const value = term.toUpperCase();

  return !DENY_LIST_TERMS.includes(value);
}
