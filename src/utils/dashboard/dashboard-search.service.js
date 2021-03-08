/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Services data dashboard search.
 */

// App dependencies
import * as DashboardService from "./dashboard.service";
import * as DashboardSortService from "./dashboard-sort.service";
import * as DashboardTableService from "./dashboard-table.service";

// Template variables
const setOfDenyListTerms = new Set(["NA", "--", "", null]);

/* Search input deny list. */
export const DenyListInputs = ["^", "~", ":", "-", "+"];

/**
 * Returns FE model of checkboxes by facet.
 *
 * @param facetsByTerm
 * @param searchFacets
 * @returns {*}
 */
export function buildDashboardCheckboxesByFacet(facetsByTerm, searchFacets) {

    return searchFacets.reduce((acc, facet) => {

        const checkboxGroup = {
            checkboxes: buildCheckboxesByFacet(facet, facetsByTerm),
            groupName: DashboardTableService.switchDisplayColumnName(facet)
        };

        acc.push(checkboxGroup);

        return acc;
    }, [])
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
export function getCountsByTerm(facetByTerm, setOfCountResultsByFacet, entities, resultKey) {

    if ( setOfCountResultsByFacet.size === 0 ) {

        return new Map();
    }

    return [...facetByTerm].reduce((acc, [term, facet]) => {

        /* Get the corresponding setOfResults for the facet. */
        const setOfCountResults = setOfCountResultsByFacet.get(facet);

        /* Filter the entities. */
        const fEntities = DashboardService.filterDashboardEntities(entities, setOfCountResults, resultKey);

        /* Get the counter for the term. */
        const termCounter = getTermCounter(facet, term, fEntities);
        acc.set(term, termCounter);

        return acc;
    }, new Map());
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
            if ( DashboardService.isArray(term) ) {

                entity[facet].forEach(term => {

                    if ( !setOfDenyListTerms.has(term) ) {

                        acc.set(term, facet);
                    }
                })
            }
            else {

                if (!setOfDenyListTerms.has(term)) {

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
        const termSearchValue = termDisplay.replace(/(\/|,|-|\s|\(|\))/g, "_");
        termSearchValueByTermDisplay.set(termDisplay, termSearchValue);
    });

    return termSearchValueByTermDisplay;
}

/**
 * Builds a FE model of checkboxes for the specified facet.
 *
 * @param facet
 * @param facetsByTerm
 * @returns {*}
 */
function buildCheckboxesByFacet(facet, facetsByTerm) {

    return [...facetsByTerm].reduce((acc, [term, ft]) => {

        if ( ft === facet ) {

            const checkbox = {
                label: switchCheckboxLabelDisplayText(term),
                value: term
            };

            acc.push(checkbox);
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

        if ( DashboardService.isArray(entity[facet]) ) {

            entity[facet].forEach(ef => {

                if ( ef === term ) {

                    acc++;
                }
            })
        }
        else {

            if (entity[facet] === term) {

                acc++;
            }
        }

        return acc;
    }, 0);
}

/**
 * Returns checkbox text value in format compatible for display.
 *
 * @param label
 * @returns {*}
 */
function switchCheckboxLabelDisplayText(label) {

    switch (label) {
        case "anvil":
            return DashboardTableService.switchStudyPlatform(label);
        case "BDC":
            return DashboardTableService.switchStudyPlatform(label);
        case "CRDC":
            return DashboardTableService.switchStudyPlatform(label);
        case "KFDRC":
            return DashboardTableService.switchStudyPlatform(label);
        case "WES":
            return "Whole Exome Sequencing";
        case "WGS":
            return "Whole Genome Sequencing";
        case "VCF":
            return "Variant Call Format";
        default:
            return label;
    }
}
