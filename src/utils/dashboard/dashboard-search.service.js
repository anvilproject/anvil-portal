/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Services data dashboard search.
 */

// App dependencies
import { sortTerms } from "./dashboard-sort.service";

// Template variables
const regexSpecialChars = /[^a-zA-Z0-9\s]/g;
const DENY_LIST_TERMS = [
  "ATTRIBUTEVALUE",
  "NOT APPLICABLE",
  "N/A",
  "NA",
  "--",
  "",
  null,
];

/**
 * Returns the dashboard count of displayable panels.
 * @param searchFacets
 * @param termGroupsByFacet
 * @returns {number}
 */
export function getDashboardPanelCount(searchFacets, termGroupsByFacet) {
  const setOfPanels = new Set();
  searchFacets.forEach((facet) => {
    if (termGroupsByFacet?.has(facet)) {
      [...termGroupsByFacet.get(facet)].map((termsGroup) =>
        setOfPanels.add(termsGroup)
      );
    } else setOfPanels.add(facet);
  });

  return setOfPanels.size;
}

/**
 * Returns the entire set of entities for the result key.
 *
 * @param entities
 * @param resultKey
 * @returns {Set<any>}
 */
export function getDashboardSetOfEntities(entities, resultKey) {
  return new Set(entities.map((entity) => entity[resultKey]));
}

/**
 * Returns a map object key-value pair entity key and row data.
 *
 * @param entities
 * @param resultKey
 * @returns {Map<any, any>}
 */
export function getDashboardRowsByRowKey(entities, resultKey) {
  /* Build the rows by row key. */
  const rowsByRowKey = new Map();
  /* For each row, set the entity key and row data. */
  entities.forEach((entity) => {
    const key = entity[resultKey];
    rowsByRowKey.set(key, entity);
  });

  return rowsByRowKey;
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
  facets.forEach((facet) => setOfTermsByFacet.set(facet, new Set()));

  /* Grab all possible terms for each facet, from the entities. */
  for (const facet of facets) {
    const setOfTerms = new Set();
    for (const entity of entities) {
      /* Grab the value for the facet. */
      const value = entity[facet];

      /* Handle case where term is not an array - make a single term an array of single length. */
      const terms = Array.isArray(value) ? value : Array.of(value);

      /* Add to the set of terms. */
      terms.forEach((term) => {
        if (isTermAllowed(term)) {
          setOfTerms.add(term);
        }
      });
    }

    /* Sort terms and set with corresponding facet. */
    const terms = [...setOfTerms];
    const sortedTerms = sortTerms(terms);
    setOfTermsByFacet.set(facet, new Set(sortedTerms));
  }
  /* Add the "search" facet. */
  setOfTermsByFacet.set("search", new Set());

  return setOfTermsByFacet;
}

/**
 * Returns the count and uncounted for the specified term.
 *
 * @param facet
 * @param term
 * @param entities
 */
export function getDashboardTermCount(facet, term, entities) {
  return entities.reduce(
    (acc, entity) => {
      /* Term is one of the facet values (facet is an array). */
      if (Array.isArray(entity[facet])) {
        if (entity[facet].includes(term)) {
          acc[0]++;
          return acc;
        }
      }
      /* Term is equal to the facet value. */
      if (entity[facet] === term) {
        acc[0]++;
        return acc;
      }
      /* Term does not exist for this facet. */
      acc[1]++;
      return acc;
    },
    [0, 0]
  );
}

/**
 * Returns the map object key-value pair facet and term group by term.
 * @param termGroupsByFacet
 * @param setOfTermsByFacet
 * @returns {Map<any, any>}
 */
export function getDashboardTermGroupsByTermByFacet(
  termGroupsByFacet,
  setOfTermsByFacet
) {
  const termGroupsByTermByFacet = new Map();
  if (termGroupsByFacet && termGroupsByFacet.size > 0) {
    for (const [facet, termGroups] of termGroupsByFacet) {
      const termGroupsByTerm = new Map();
      for (const termGroup of termGroups) {
        const setOfTerms = setOfTermsByFacet.get(termGroup);
        [...setOfTerms].forEach((term) =>
          termGroupsByTerm.set(term, termGroup)
        );
        /* Remove the term group from setOfTermsByFacet - the term group will not be its own facet. */
        setOfTermsByFacet.delete(termGroup);
      }
      termGroupsByTermByFacet.set(facet, termGroupsByTerm);
    }
  }
  return termGroupsByTermByFacet;
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
 * Returns true if the term is allowable.
 *
 * @param term
 */
function isTermAllowed(term) {
  const value = term.toUpperCase();

  return !DENY_LIST_TERMS.includes(value);
}
