/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL dashboard filter provider component.
 */

// Core dependencies
import lunr from "lunr";
import React from "react";

// App dependencies
import ContextDashboardFilter from "../context-dashboard-filter/context-dashboard-filter";
import * as AnvilGTMService from "../../../utils/anvil-gtm/anvil-gtm.service";
import { GAEntityType } from "../../../utils/anvil-gtm/ga-entity-type.model";
import * as DashboardService from "../../../utils/dashboard/dashboard.service";
import * as DashboardSearchService from "../../../utils/dashboard/dashboard-search.service";
import * as DashboardSummaryService from "../../../utils/dashboard/dashboard-summary.service";

class ProviderDashboardFilter extends React.Component {

    constructor(props) {
        super(props);

        this.onHandleChecked = (event) => {

            const {checked, value} = event;

            /* Clone state variable termsChecked. */
            const termsCheckedClone = new Map(this.state.termsChecked);

            /* Update clone. */
            termsCheckedClone.set(value, checked);

            /** Get tracking values for selected facet */
            const previousQuery = this.state.query;
            const {facetsByTerm} = this.state;
            const currentQuery = this.buildQuery(facetsByTerm, this.state.inputValue, termsCheckedClone);

            /* Update state. */
            this.setState({
                termsChecked: termsCheckedClone,
                query: currentQuery
            });

            /* Execute tracking */
            AnvilGTMService.trackSearchFacetSelected(
                facetsByTerm.get(value), value, checked, currentQuery, previousQuery, GAEntityType.WORKSPACE);
        };

        this.onHandleClearInput = () => {

            /* Handle change in search value. */
            this.onHandleSearch("");
        };

        this.onHandleInitializeDashboard = (event) => {

            this.setState({
                checkboxGroups: event.checkboxGroups,
                countLabel: event.countLabel,
                dashboardEntities: event.dashboardEntities,
                dashboardIndexFileName: event.dashboardIndexFileName,
                facetsByTerm: event.facetsByTerm,
                resultKey: event.resultKey,
                setOfSearchGroups: event.setOfSearchGroups,
                setOfTerms: event.setOfTerms,
                summaryKey: event.summaryKey,
                termSearchValueByTermDisplay: event.termSearchValueByTermDisplay,
                tableHeadersEntities: event.tableHeadersEntities,
                tableHeadersSummary: event.tableHeadersSummary
            });
        };

        this.onHandleInput = (event) => {

            const inputValue = event.target.value;

            /* Handle change in search value. */
            this.onHandleSearch(inputValue);
        };

        this.state = ({
            checkboxGroups: [],
            countLabel: "",
            dashboardEntities: [],
            dashboardIndex: [],
            dashboardIndexFileName: "",
            dashboardIndexMounted: false,
            facetsByTerm: new Map(),
            inputValue: "",
            query: "", // Analytics-specific value, used to specify the current query state when tracking a change
            resultKey: "",
            setOfCountResultsByFacet: new Map(),
            setOfResults: new Set(),
            setOfResultsBySearchGroups: new Map(),
            setOfSearchGroups: new Set(),
            setOfTerms: new Set(),
            summaryKey: "",
            termSearchValueByTermDisplay: new Map(),
            tableHeadersEntities: [],
            tableHeadersSummary: [],
            termsChecked: new Map(),
            onHandleChecked: this.onHandleChecked,
            onHandleClearInput: this.onHandleClearInput,
            onHandleInitializeDashboard: this.onHandleInitializeDashboard,
            onHandleInput: this.onHandleInput,
        });
    }

    componentDidUpdate(_, prevState) {

        /* Dashboard index file name ready - initialize dashboard. */
        this.dashboardIndexFileNameStateChange(prevState);

        /* Dashboard index mounted - update results. */
        this.dashboardIndexMountedStateChanged(prevState);

        /* Search state changed. */
        this.searchStateChanged(prevState);

        /* Results state changed. */
        this.setOfResultsBySearchGroupsStateChanged(prevState);
    }

    componentWillUnmount() {

        this.setState = ({
            checkboxGroups: [],
            countLabel: "",
            dashboardEntities: [],
            dashboardIndex: [],
            dashboardIndexFileName: "",
            dashboardIndexFileNameMounted: false,
            dashboardIndexMounted: false,
            facetsByTerm: new Map(),
            inputValue: "",
            query: "",
            resultKey: "",
            setOfCountResultsByFacet: new Map(),
            setOfResults: new Set(),
            setOfResultsBySearchGroups: new Map(),
            setOfSearchGroups: new Set(),
            setOfTerms: new Set(),
            summaryKey: "",
            tableHeadersEntities: [],
            tableHeadersSummary: [],
            termsChecked: new Map(),
        });
    }

    buildFacetQueryString = (selectedTerms, facet) => {

        if ( selectedTerms.length ) {

            return selectedTerms.map(selectedTerm => `${facet}: ${selectedTerm}`).join(" ");
        }

        return "";
    };

    buildInputValueString = (inputValue) => {

        if ( inputValue ) {

            /* Multiple input values. */
            if ( inputValue.includes(" ") ) {

                const values = inputValue.split(" ");

                return values.map(value => `+${value}*`).join(" ");
            }

            /* Singular input value. */
            return `+${inputValue}*`;
        }

        return "";
    };

    /**
     * Build the query string from the specified set of selected facet terms and input value.
     *
     * @param facetsByTerm
     * @param inputValue
     * @param termsChecked
     */
    buildQuery = (facetsByTerm, inputValue, termsChecked) => {

        const selectedTermsByFacet = [...facetsByTerm.keys()]
            .reduce((accum, term)=> {

                // Only add term to current query if it's currently selected
                if ( termsChecked.get(term) ) {

                    const facet = facetsByTerm.get(term);

                    // A term as already been added to the current query for this facet; add term to existing array
                    if ( accum.has(facet) ) {
                        accum.get(facet).push(term);
                    }
                    // This is the first term selected for the facet, create new array containing term
                    else {
                        accum.set(facet, [term]);
                    }
                }
                return accum;
            }, new Map());

        if ( inputValue ) {
            selectedTermsByFacet.set("search", inputValue);
        }

        // Convert selected terms to valid query string object
        return new URLSearchParams(selectedTermsByFacet).toString();
    };

    dashboardIndexFileNameStateChange = (prevState) => {

        const {dashboardIndexFileName} = this.state;

        const stateChanged = ( prevState.dashboardIndexFileName !== dashboardIndexFileName );

        if ( stateChanged ) {

            /* Grab the index. */
            this.fetchDashboardIndex();

            /* Initialize the state "inputValue". */
            this.initializeInputValue();

            /* Initialize the state "termsChecked". */
            this.initializeTermsChecked();
        }
    };

    dashboardIndexMountedStateChanged = (prevState) => {

        const {dashboardIndexMounted} = this.state;

        const stateChanged = ( prevState.dashboardIndexMounted !== dashboardIndexMounted );

        if ( stateChanged ) {

            /* Update set of results. */
            this.updateSetOfResults();
        }
    };

    fetchDashboardIndex = () => {

        const {dashboardIndexFileName} = this.state;

        fetch(dashboardIndexFileName)
            .then(res => res.json())
            .then(res => {
                const index = lunr.Index.load(res);

                this.setState({dashboardIndex: index, dashboardIndexMounted: true})
            })
            .catch(err => {
                console.log(err, "Error loading index");
            });
    };

    findIntersectionSetOfResults = (setOfResultsBySearchGroups) => {

        /* Sort the set of results by set size. */
        const sortedSetsOfResults = this.sortSetsOfResults(setOfResultsBySearchGroups);
        const firstSetOfResults = sortedSetsOfResults.shift();

        /* Create a new set of intersection results. */
        /* i.e. filter through the smallest set to confirm results exist in all other search group sets. */
        return new Set([...firstSetOfResults].filter(result => {

            return sortedSetsOfResults.every(setOfResults => setOfResults.has(result));
        }));
    };

    getResultsByQuery = (query) => {

        const {dashboardIndex} = this.state;

        const queryString = `${query}`;
        const results = dashboardIndex.search(queryString);

        return new Set(results.map(result => result.ref));
    };

    getSelectedSearchTerms = (selectedTerms) => {

        const {termSearchValueByTermDisplay} = this.state;

        return selectedTerms.map(selectedTerm => termSearchValueByTermDisplay.get(selectedTerm));
    };

    getSetOfFacetedResults = (facet) => {

        /* Grab any checked terms for the facet. */
        const selectedTerms = this.getTermsChecked(facet);

        /* Convert the checked terms to a suitable search term format. */
        const selectedSearchTerms = this.getSelectedSearchTerms(selectedTerms);

        /* Build the query string. */
        const facetQueryString = this.buildFacetQueryString(selectedSearchTerms, facet);

        return this.getResultsByQuery(facetQueryString);
    };

    getSetOfInputResults = () => {

        const {inputValue} = this.state;
        const inputString = this.buildInputValueString(inputValue);

        return new Set(this.getResultsByQuery(inputString));
    };

    getSetOfResults = () => {

        /* Get the set of results by search groups. */
        const setOfResultsBySearchGroups = this.getSetOfResultsBySearchGroups();

        /* Update set of results by search group. */
        this.updateSetOfResultsBySearchGroups(setOfResultsBySearchGroups);

        /* Return any intersecting sets of results. i.e. searching will be "AND" between facets and input. */
        return this.findIntersectionSetOfResults(setOfResultsBySearchGroups);
    };

    getSetOfResultsBySearchGroup = (searchGroup) => {

        /* Return a set of results for the search group "input". */
        if ( searchGroup === "input" ) {

            return this.getSetOfInputResults();
        }

        /* Return a set of results for the faceted search group. */
        return this.getSetOfFacetedResults(searchGroup);
    };

    getSetOfResultsBySearchGroups = () => {

        const {setOfSearchGroups} = this.state;

        return [...setOfSearchGroups].reduce((acc, searchGroup) => {

            const resultsBySearchGroup = this.getSetOfResultsBySearchGroup(searchGroup);
            acc.set(searchGroup, resultsBySearchGroup);

            return acc;
        }, new Map());
    };

    getSetOfURLParams = () => {

        /* Grab the URL params. */
        const params = [...this.getURLParams().values()];

        /* Return a set of the URL params. */
        return params.reduce((acc, param) => {

            const paramsByFacet = param.split(",");
            paramsByFacet.forEach(param => acc.add(param));

            return acc;
        }, new Set())
    };

    getTermsChecked = (facet) => {

        const {facetsByTerm, termsChecked} = this.state;

        return [...termsChecked].reduce((acc, [term, checked]) => {

            const termInFacet = facetsByTerm.get(term) === facet;

            if ( termInFacet && checked ) {

                acc.push(term);
            }

            return acc;
        }, []);
    };

    getURLParams = () => {

        /* Grab the search parameters. */
        const urlSearchParams = new URLSearchParams(window.location.search);
        const currentQuery = urlSearchParams.get("query");

        return new URLSearchParams(currentQuery);
    };

    initializeInputValue = () => {

        const inputValue = this.getURLParams().get("search");

        if ( inputValue ) {

            this.onHandleSearch(inputValue);
        }
    };

    initializeTermsChecked = () => {

        const {setOfTerms} = this.state;

        const termsChecked = new Map();

        /* Grab checkbox values from the URL - any input values will be ignored. */
        const setOfURLParamValues = this.getSetOfURLParams();

        [...setOfTerms].forEach(term => {

            /* Checkbox value will be true, if the URL has the checkbox value. */
            const checked = setOfURLParamValues.has(term);

            termsChecked.set(term, checked);
        });

        this.setState({termsChecked: termsChecked});
    };

    isInputDenied = (inputValue) => {

        return DashboardSearchService.DenyListInputs.some(deniedInput => inputValue.includes(deniedInput));
    };

    onHandleSearch = (inputValue) => {

        if ( this.isInputDenied(inputValue) ) {

            return;
        }

        /* Track input */
        const previousQuery = this.state.query;
        const {facetsByTerm} = this.state;

        const currentQuery = this.buildQuery(facetsByTerm, inputValue, this.state.termsChecked);

        /* Update inputValue state. */
        this.setState({
            inputValue: inputValue,
            query: currentQuery
        });

        /** Execute tracking */
        AnvilGTMService.trackSearchInput(inputValue, currentQuery, previousQuery, GAEntityType.WORKSPACE);
    };

    searchStateChanged = (prevState) => {

        const {dashboardIndexMounted, inputValue, termsChecked} = this.state;

        const inputValueChanged = prevState.inputValue !== inputValue;
        const termsCheckedChanged = prevState.termsChecked !== termsChecked;

        const stateChanged = inputValueChanged || termsCheckedChanged;

        if ( dashboardIndexMounted && stateChanged ) {

            /* Update set of results. */
            this.updateSetOfResults();

            /* Update dashboard URL with query. */
            this.updateDashboardURL();
        }
    };

    setOfResultsBySearchGroupsStateChanged = (prevState) => {

        const {dashboardIndexMounted, setOfResultsBySearchGroups} = this.state;

        const stateChanged = ( prevState.setOfResultsBySearchGroups !== setOfResultsBySearchGroups );

        if ( dashboardIndexMounted && stateChanged ) {

            /* Update term counts. */
            this.updateTermCounts();
        }
    };

    sortSetsOfResults = (setOfResultsBySearchGroups) => {

        return [...setOfResultsBySearchGroups.values()]
            .sort(function (set0, set1) {

                if ( set0.size > set1.size ) {

                    return 1;
                }
                else {

                    return -1;
                }
            });
    };

    updateDashboardURL = () => {

        const {query} = this.state;

        const params = new URLSearchParams();
        params.set("query", query);

        /* Push to URL. */
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    updateSetOfResults = () => {

        /* Get the set of results. */
        const setOfResults = this.getSetOfResults();

        /* Clone setOfResults, and update state. */
        const setOfResultsClone = new Set(setOfResults);

        this.setState({setOfResults: setOfResultsClone});
    };

    updateSetOfResultsBySearchGroups = (setOfResultsBySearchGroups) => {

        /* Clone setOfResultsBySearchGroups and update state. */
        const setOfResultsBySearchGroupsClone = new Map(setOfResultsBySearchGroups);

        this.setState({setOfResultsBySearchGroups: setOfResultsBySearchGroupsClone});
    };

    updateTermCounts = () => {

        const {facetsByTerm, setOfResultsBySearchGroups} = this.state;

        /* Get a set of facets. */
        const setOfFacets = new Set([...facetsByTerm.values()]);

        /* Get the results for each facet. */
        const setOfCountResultsByFacet = [...setOfFacets].reduce((acc, facet) => {

            /* Clone the setOfResultsBySearchGroups. */
            const setOfResultsBySearchGroupsClone = new Map(setOfResultsBySearchGroups);

            /* Remove the facet from the setOfResultsBySearchGroups */
            /* We are only interested in the intersection of results between the other facets/input. */
            setOfResultsBySearchGroupsClone.delete(facet);

            /* Get the intersection of results. */
            const setOfResults = this.findIntersectionSetOfResults(setOfResultsBySearchGroupsClone);

            acc.set(facet, setOfResults);

            return acc;
        }, new Map());

        /* Update state. */
        this.setState({setOfCountResultsByFacet: setOfCountResultsByFacet});
    };

    render() {
        const {children} = this.props,
            {checkboxGroups, countLabel ,dashboardEntities, facetsByTerm, inputValue, resultKey,
                summaryKey, setOfCountResultsByFacet, setOfResults, tableHeadersEntities, tableHeadersSummary, termsChecked,
                onHandleChecked, onHandleClearInput, onHandleInitializeDashboard, onHandleInput} = this.state;
        const entities = DashboardService.filterDashboardEntities(dashboardEntities, setOfResults, resultKey);
        const summaries = DashboardSummaryService.getDashboardSummary(entities, summaryKey ,tableHeadersSummary);
        const termsCount = DashboardSearchService.getCountsByTerm(facetsByTerm, setOfCountResultsByFacet, dashboardEntities, resultKey);
        return (
            <ContextDashboardFilter.Provider value={{checkboxGroups, countLabel, entities, inputValue, setOfResults, summaries,
                tableHeadersEntities, tableHeadersSummary, termsChecked, termsCount,
                onHandleChecked, onHandleClearInput, onHandleInitializeDashboard, onHandleInput}}>
                {children}
            </ContextDashboardFilter.Provider>
        )
    }
}

export default ProviderDashboardFilter;
