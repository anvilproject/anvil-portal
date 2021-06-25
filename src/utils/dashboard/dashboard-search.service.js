/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Services data dashboard search.
 */

// App dependencies
import * as DashboardService from "./dashboard.service";
import * as DashboardSortService from "./dashboard-sort.service";

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

/* Search input deny list. */
export const DenyListInputs = ["^", "~", ":", "-", "+"];

/**
 * Returns FE model of facets and facet terms.
 *
 * @param facetsByTerm
 * @param searchFacets
 * @returns {*}
 */
export function buildDashboardFacets(facetsByTerm, searchFacets) {
  return searchFacets.reduce((acc, facet) => {
    const facetTerms = {
      terms: getFacetTerms(facet, facetsByTerm),
      name: facet
    };

    acc.push(facetTerms);

    return acc;
  }, []);
}

/**
 * Returns the facet selector facets with filtered facet terms.
 *
 * @param facets
 * @param termsCount
 * @param termsSelected
 * @returns {*}
 */
export function buildFacetSelectorFacets(facets, termsCount, termsSelected) {
  return [...facets].map(facet => {
    const facetClone = { ...facet };
    const terms = buildDashboardTerms(
      facetClone.terms,
      termsCount,
      termsSelected
    );

    return Object.assign(facetClone, { terms: terms });
  });
}

/**
 * Returns a map of counts for each term.
 *
 * @param facetByTerm
 * @param setOfCountResultsByFacet
 * @param entities
 * @param resultKey
 * @returns {*}
 */
export function getCountsByTerm(
  facetByTerm,
  setOfCountResultsByFacet,
  entities,
  resultKey
) {
  if (setOfCountResultsByFacet.size === 0) {
    return new Map();
  }

  return [...facetByTerm].reduce((acc, [term, facet]) => {
    /* Get the corresponding setOfResults for the facet. */
    const setOfCountResults = setOfCountResultsByFacet.get(facet);

    /* Filter the entities. */
    const fEntities = DashboardService.filterDashboardEntities(
      entities,
      setOfCountResults,
      resultKey
    );

    /* Get the counter for the term. */
    const termCounter = getTermCounter(facet, term, fEntities);
    acc.set(term, termCounter);

    return acc;
  }, new Map());
}

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
 * Returns a map object of facet by term.
 * Values are sorted alphabetically.
 *
 * @param entities
 * @param searchFacets
 * @returns {*}
 */
export function getDashboardFacetsByTerm(entities, searchFacets) {
  const facetsByTerm = searchFacets.reduce((acc, facet) => {
    /* Grab the terms. */
    entities.forEach(entity => {
      const term = entity[facet];

      /* Handle case where term is an array. */
      if (DashboardService.isArray(term)) {
        entity[facet].forEach(term => {
          if (isTermAllowed(term)) {
            acc.set(term, facet);
          }
        });
      } else {
        if (isTermAllowed(term)) {
          acc.set(term, facet);
        }
      }
    });

    return acc;
  }, new Map());

  /* Return sorted facetsByTerm. */
  return DashboardSortService.sortMap(facetsByTerm);
}

/**
 * Returns a set of search groups.
 *
 * @param searchFacets
 * @returns {Set}
 */
export function getDashboardSetOfSearchGroups(searchFacets) {
  const setOfSearchGroups = new Set();

  /* Add the facets, and the "input" to the set. */
  searchFacets.forEach(facet => setOfSearchGroups.add(facet));
  setOfSearchGroups.add("input");

  return setOfSearchGroups;
}

/**
 * Returns a set of summary key terms.
 *
 * @param facetsByTerm
 * @param facet
 * @returns {*}
 */
export function getSetOfSummaryKeyTerms(facetsByTerm, facet) {
  return [...facetsByTerm].reduce((acc, [term, ft]) => {
    if (ft === facet) {
      acc.add(term);
    }

    return acc;
  }, new Set());
}

/**
 * Returns the set of terms for all facets.
 *
 * @param facetsByTerm
 * @returns {*}
 */
export function getDashboardSetOfTerms(facetsByTerm) {
  return new Set([...facetsByTerm.keys()]);
}

/**
 * Returns a map object of term search value by term display where
 * - term display is the term value
 * - term search value is the term value, with white space, hyphens or brackets or slash are changed to an underscore.
 * e.g. "GTEx (v8)" returns "GTEx__v8_".
 *
 * @param facetsByTerm
 * @returns {Map}
 */
export function getDashboardTermSearchValueByTermDisplay(facetsByTerm) {
  const termSearchValueByTermDisplay = new Map();

  [...facetsByTerm.keys()].forEach(termDisplay => {
    /* Replace any white space, commas, hyphens or brackets with an underscore. */
    const termSearchValue = termDisplay
      .toLowerCase()
      .replace(regexSpecialChars, "_")
      .replace(/\s/g, "_");

    termSearchValueByTermDisplay.set(termDisplay, termSearchValue);
  });

  return termSearchValueByTermDisplay;
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
 * Returns the FE model of dashboard term.
 *
 * @param term
 * @param termsCount
 * @param termsSelected
 * @returns {{name, count, selected}}
 */
function buildDashboardTerm(term, termsCount, termsSelected) {
  const count = termsCount.get(term);
  const selected = termsSelected.get(term);

  return { name: term, count: count, selected: selected };
}

/**
 * Returns the filtered FE model of dashboard terms.
 *
 * @param terms
 * @param termsCount
 * @param termsSelected
 * @returns {[]}
 */
function buildDashboardTerms(terms, termsCount, termsSelected) {
  return terms
    .map(term => buildDashboardTerm(term, termsCount, termsSelected))
    .filter(term => isTermSelectable(term));
}

/**
 * Returns the terms for the specified facet.
 *
 * @param facet
 * @param facetsByTerm
 * @returns {*}
 */
function getFacetTerms(facet, facetsByTerm) {
  return [...facetsByTerm].reduce((acc, [term, ft]) => {
    if (ft === facet) {
      acc.push(term);
    }

    return acc;
  }, []);
}

/**
 * Returns the count for the specified term.
 *
 * @param facet
 * @param term
 * @param entities
 */
function getTermCounter(facet, term, entities) {
  return entities.reduce((acc, entity) => {
    if (DashboardService.isArray(entity[facet])) {
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
 * Returns true if the term is allowable.
 *
 * @param term
 */
function isTermAllowed(term) {
  const value = term.toUpperCase();

  return !DENY_LIST_TERMS.includes(value);
}

/**
 * Returns true if the term has a count greater than 0, or is selected.
 *
 * @param term
 * @returns {*}
 */
function isTermSelectable(term) {
  const { count, selected } = term;

  return count || selected;
}
