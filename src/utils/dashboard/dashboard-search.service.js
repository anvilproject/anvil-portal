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
import * as DashboardWorkspaceService from "./dashboard-workspace.service";

/* Search input deny list. */
export const DenyListInputs = ["^", "~", ":", "-"];

/* Set of facets (selected from workspace property values) for the dashboard search function. */
export const DashboardSearchFacets = [
    "consortium",
    "accessUI",
    "dataTypes"
];

/**
 * Returns FE model of terms by facet.
 *
 * @param termsByFacets
 * @returns {Array}
 */
export function buildDashboardCheckboxesByFacet(termsByFacets) {

    if ( !termsByFacets ) {

        return [];
    }

    return [...termsByFacets].map(([facet, terms]) => {

        return {
            checkboxes: buildCheckboxes(terms),
            groupName: DashboardTableService.switchDisplayColumnName(facet)
        };
    });
}

/**
 * Returns a map of counts for each term.
 *
 * @param facetByTerm
 * @param setOfCountResultsByFacet
 * @param inputting
 * @param workspacesQuery
 * @returns {*}
 */
export function getCountsByTerms(facetByTerm, setOfCountResultsByFacet, inputting, workspacesQuery) {

    return [...facetByTerm].reduce((acc, [term, facet]) => {

        /* Get the corresponding setOfResults for the facet. */
        const setOfCountResults = setOfCountResultsByFacet.get(facet);

        /* Filter the workspaces. */
        const workspaces = DashboardWorkspaceService.getDashboardWorkspacesForCount(workspacesQuery, setOfCountResults, inputting);

        /* Get the counter for the term. */
        const termCounter = getTermCounter(facet, term, workspaces);
        acc.set(term, termCounter);

        return acc;
    }, new Map());
}

/**
 * Returns a map of object of checkbox values by workspace property.
 *
 * @returns {Map}
 */
export function getDashboardFacets(workspaces) {

    /* Generate a new map object of checkbox by workspace property as the key. */
    /* For each key, find a set of workspace values corresponding to the workspace property. */
    let checkboxesByProperty = new Map();

    /* For each property, grab the set of corresponding workspace values. */
    DashboardSearchFacets.forEach(property => {

        const setOfCheckboxValues = new Set();

        /* Grab the set of values, and corresponding count for the specified workspace property. */
        workspaces.forEach(workspace => {

            /* Return if the value is invalid. */
            if ( isCheckboxValueInvalid(workspace[property]) ) {

                return;
            }

            /* Check the value is an array and grab all values inside the array. */
            if ( DashboardService.isArray(workspace[property]) ) {

                const workspaceValues = workspace[property];

                workspaceValues.forEach(value => {

                    /* Check there are no invalid values inside the array. */
                    if ( !isCheckboxValueInvalid(value) ) {

                        setOfCheckboxValues.add(value)
                    }
                });
            }
            /* Otherwise, grab the value. */
            else {

                const workspaceValue = workspace[property];

                setOfCheckboxValues.add(workspaceValue);
            }
        });

        /* Sort the set of values. */
        const checkboxValues = DashboardSortService.sortData([...setOfCheckboxValues]);

        checkboxesByProperty.set(property, checkboxValues);
    });

    return checkboxesByProperty;
}

/**
 * Returns a map of facet by term.
 *
 * @param termsByFacets
 * @returns {Map}
 */
export function getDashboardFacetByTerm(termsByFacets) {

    const termByFacet = new Map();

    [...termsByFacets].forEach(([facet, terms]) => {

        terms.forEach(term => termByFacet.set(term, facet));
    });

    return termByFacet;
}

/**
 * Returns the set of terms for all facets.
 *
 * @param termsByFacets
 * @returns {*}
 */
export function getDashboardSetOfTerms(termsByFacets) {

    return [...termsByFacets.values()].reduce((acc, terms) => {

        terms.map(term => acc.add(term));

        return acc;
    }, new Set());
}

/**
 * Returns FE model for checkboxes.
 *
 * @param terms
 * @returns {Array}
 */
function buildCheckboxes(terms) {

    if ( !terms ) {

        return [];
    }

    return terms.map(term => {

        return {
            label: switchWorkspaceValueDisplayText(term),
            value: term
        }
    })
}

/**
 * Returns the count for the specified term.
 *
 * @param facet
 * @param term
 * @param workspaces
 */
function getTermCounter(facet, term, workspaces) {

    return workspaces.reduce((acc, workspace) => {

        if ( DashboardService.isArray(workspace[facet]) ) {

            workspace[facet].forEach(wf => {

                if ( wf === term ) {

                    acc++;
                }
            })
        }
        else {

            if (workspace[facet] === term) {

                acc++;
            }
        }

        return acc;
    }, 0);
}

/**
 * Returns true if the checkbox value is invalid.
 *
 * @param checkboxValue
 * @returns {boolean}
 */
function isCheckboxValueInvalid(checkboxValue) {

    return !checkboxValue || checkboxValue === "NA";
}

/**
 * Returns workspace text value in format compatible for display.
 *
 * @param value
 * @returns {*}
 */
function switchWorkspaceValueDisplayText(value) {

    switch (value) {
        case "WES":
            return "Whole Exome Sequencing";
        case "WGS":
            return "Whole Genome Sequencing";
        case "VCF":
            return "Variant Call Format";
        default:
            return value;
    }
}
