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
 * @param termGroupsByFacetName
 * @returns {number}
 */
export function getDashboardPanelCount(searchFacets, termGroupsByFacetName) {
  const setOfPanels = new Set();
  searchFacets.forEach((facetName) => {
    if (termGroupsByFacetName?.has(facetName)) {
      [...termGroupsByFacetName.get(facetName)].map((termsGroup) =>
        setOfPanels.add(termsGroup)
      );
    } else setOfPanels.add(facetName);
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
 * Returns a map object of set of terms by facet name.
 *
 * @param entities
 * @param facetNames
 * @returns {Map<any, any>}
 */
export function getDashboardSetOfTermsByFacetName(entities, facetNames) {
  /* Init setOfTermsByFacetName and the setOfTerms for each facet. */
  const setOfTermsByFacetName = new Map();
  facetNames.forEach((facetName) =>
    setOfTermsByFacetName.set(facetName, new Set())
  );

  /* Grab all possible terms for each facet, from the entities. */
  for (const facetName of facetNames) {
    const setOfTerms = new Set();
    for (const entity of entities) {
      /* Grab the value for the facet. */
      const value = entity[facetName];

      /* Handle case where term is not an array - make a single term an array of single length. */
      const terms = Array.isArray(value) ? value : Array.of(value);

      /* Add to the set of terms. */
      terms
        .filter((term) => term && term !== "--")
        .map((term) => setOfTerms.add(term));
    }

    /* Sort terms and set with corresponding facet. */
    const terms = [...setOfTerms];
    const sortedTerms = sortTerms(terms);
    setOfTermsByFacetName.set(facetName, new Set(sortedTerms));
  }
  /* Add the "search" facet. */
  setOfTermsByFacetName.set("search", new Set());

  return setOfTermsByFacetName;
}

/**
 * Returns the count and uncounted for the specified term.
 *
 * @param facetName
 * @param term
 * @param entities
 */
export function getDashboardTermCount(facetName, term, entities) {
  return entities.reduce(
    (acc, entity) => {
      /* Term is one of the facet values (facet is an array). */
      if (Array.isArray(entity[facetName])) {
        if (entity[facetName].includes(term)) {
          acc[0]++;
          return acc;
        }
      }
      /* Term is equal to the facet value. */
      if (entity[facetName] === term) {
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
 * Returns the map object key-value pair facet name and term group by term.
 * @param termGroupsByFacetName
 * @param setOfTermsByFacetName
 * @returns {Map<any, any>}
 */
export function getDashboardTermGroupsByTermByFacetName(
  termGroupsByFacetName,
  setOfTermsByFacetName
) {
  const termGroupsByTermByFacetName = new Map();
  if (termGroupsByFacetName && termGroupsByFacetName.size > 0) {
    for (const [facetName, termGroups] of termGroupsByFacetName) {
      const termGroupsByTerm = new Map();
      for (const termGroup of termGroups) {
        const setOfTerms = setOfTermsByFacetName.get(termGroup);
        [...setOfTerms].forEach((term) =>
          termGroupsByTerm.set(term, termGroup)
        );
        /* Remove the term group from setOfTermsByFacetName - the term group will not be its own facet. */
        setOfTermsByFacetName.delete(termGroup);
      }
      termGroupsByTermByFacetName.set(facetName, termGroupsByTerm);
    }
  }
  return termGroupsByTermByFacetName;
}

/**
 * Returns a map object of term search value by term display where
 * - term display is the term value
 * - term search value is the term value, with white space, hyphens or brackets or slash are changed to an underscore.
 * e.g. "GTEx (v8)" returns "GTEx__v8_".
 *
 * @param setOfTermsByFacetName
 * @returns {Map}
 */
export function getDashboardTermSearchValueByTerm(setOfTermsByFacetName) {
  /* Init termSearchValueByTerm. */
  const termSearchValueByTerm = new Map();

  /* For each facet, grab the setOfTerms. */
  for (const setOfTerms of [...setOfTermsByFacetName.values()]) {
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
