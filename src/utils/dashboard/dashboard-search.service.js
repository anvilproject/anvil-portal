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

// Template variables
const setOfDenyListTerms = new Set(["NA", "--", "", null]);

/* Search input deny list. */
export const DenyListInputs = ["^", "~", ":", "-"];

/* Set of facets (selected from workspace property values) for the dashboard search function. */
export const DashboardSearchFacets = [
    "consortium",
    "accessType",
    "dataTypes"
];

/**
 * Returns FE model of checkboxes by facet.
 *
 * @param facetsByTerm
 * @returns {*}
 */
export function buildDashboardCheckboxesByFacet(facetsByTerm) {

    return DashboardSearchFacets.reduce((acc, facet) => {

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
 * @param workspacesQuery
 * @returns {*}
 */
export function getCountsByTerm(facetByTerm, setOfCountResultsByFacet, workspacesQuery) {

    if ( setOfCountResultsByFacet.size === 0 ) {

        return new Map();
    }

    return [...facetByTerm].reduce((acc, [term, facet]) => {

        /* Get the corresponding setOfResults for the facet. */
        const setOfCountResults = setOfCountResultsByFacet.get(facet);

        /* Filter the workspaces. */
        const workspaces = DashboardWorkspaceService.getDashboardWorkspaces(workspacesQuery, setOfCountResults);

        /* Get the counter for the term. */
        const termCounter = getTermCounter(facet, term, workspaces);
        acc.set(term, termCounter);

        return acc;
    }, new Map());
}

/**
 * Returns a map object of facet by term.
 * Values are sorted alphabetically.
 *
 * @param workspacesQuery
 * @returns {*}
 */
export function getDashboardFacetsByTerm(workspacesQuery) {

    const facetsByTerm = DashboardSearchFacets.reduce((acc, facet) => {

        /* Grab the terms. */
        workspacesQuery.forEach(workspace => {

            const term = workspace[facet];

            /* Handle case where term is an array. */
            if ( DashboardService.isArray(term) ) {

                workspace[facet].forEach(term => {

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
 * @returns {Set}
 */
export function getDashboardSetOfSearchGroups() {

    const setOfSearchGroups = new Set();

    /* Add the facets, and the "input" to the set. */
    DashboardSearchFacets.forEach(facet => setOfSearchGroups.add(facet));
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
                label: switchWorkspaceValueDisplayText(term),
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
