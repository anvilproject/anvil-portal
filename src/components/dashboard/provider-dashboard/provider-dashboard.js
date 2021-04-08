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
import ContextDashboard from "../context-dashboard/context-dashboard";
import * as AnvilGTMService from "../../../utils/anvil-gtm/anvil-gtm.service";
import { GAEntityType } from "../../../utils/anvil-gtm/ga-entity-type.model";
import * as DashboardService from "../../../utils/dashboard/dashboard.service";
import * as DashboardSearchService from "../../../utils/dashboard/dashboard-search.service";
import * as DashboardSummaryService from "../../../utils/dashboard/dashboard-summary.service";
import * as EnvironmentService from "../../../utils/environment/environment.service";

class ProviderDashboard extends React.Component {

    constructor(props) {
        super(props);

        this.onHandleChecked = (event) => {

            const {checked, value} = event;

            /* Clone state variable termsChecked. */
            const termsCheckedClone = new Map(this.state.termsChecked);

            /* Update clone. */
            termsCheckedClone.set(value, checked);

            /* Update termsChecked and query state and execute tracking. */
            this.onHandleUpdateFacets(termsCheckedClone, value, checked);
        };

        this.onHandleClearFacet = (facet) => {

            /* Clear search. */
            if ( facet === "search" ) {

                this.onHandleClearInput();
            }
            /* Clear facet. */
            else {

                const {facetsByTerm} = this.props;
                const {termsChecked} = this.state;
                const termsCheckedClone = new Map(termsChecked);

                /* Update clone. */
                [...termsChecked].forEach(([term, checked]) => {

                    const termFacet = facetsByTerm.get(term);

                    if ( termFacet === facet && checked ) {

                        termsCheckedClone.set(term, false);
                    }
                });

                this.onHandleUpdateFacets(termsCheckedClone);
            }
        };

        this.onHandleClearInput = () => {

            /* Handle change in search value. */
            this.onHandleUpdateSearch("");
        };

        this.onHandleClearSearch = () => {

            this.onHandleClearInput();
            this.onHandleClearFacets();
        };

        this.onHandleClearTerm = (facet, term) => {

            /* Update search. */
            if ( facet === "search" ) {

                const {inputValue} = this.state;

                /* Split inputValue into terms. */
                /* Remove the term from the terms and create a new inputValue string. */
                const terms = inputValue.split(" ");
                const termIndex = terms.findIndex(input => input === term);
                terms.splice(termIndex, 1);
                const inputValueStr = terms.join(" ");

                /* Update search with new inputValue string. */
                this.onHandleUpdateSearch(inputValueStr);
            }
            /* Update facet. */
            else {

                /* Handle change in term value. */
                this.onHandleChecked({value: term, checked: false});
            }
        };

        this.onHandleInput = (event) => {

            const inputValue = event.target.value;

            /* Handle change in search value. */
            this.onHandleUpdateSearch(inputValue);
        };

        this.state = ({
            dashboardIndex: [],
            dashboardIndexMounted: false,
            inputValue: "",
            query: "", // Analytics-specific value, used to specify the current query state when tracking a change
            searchURL: `${EnvironmentService.getCurrentEnvironmentURL()}data`,
            selectedTermsByFacet: new Map(),
            setOfCountResultsByFacet: new Map(),
            setOfResults: new Set(),
            setOfResultsBySearchGroups: new Map(),
            termsChecked: new Map(),
            onHandleChecked: this.onHandleChecked,
            onHandleClearFacet: this.onHandleClearFacet,
            onHandleClearInput: this.onHandleClearInput,
            onHandleClearSearch: this.onHandleClearSearch,
            onHandleClearTerm: this.onHandleClearTerm,
            onHandleInput: this.onHandleInput,
        });
    }

    componentDidMount() {

        /* Grab the index. */
        this.fetchDashboardIndex();

        /* Initialize the state "searchURL". */
        this.initializeSearchURL();

        /* Initialize the state "inputValue". */
        this.initializeInputValue();

        /* Initialize the state "termsChecked". */
        this.initializeTermsChecked();
    }

    componentDidUpdate(_, prevState) {

        /* Dashboard index mounted - update results. */
        this.dashboardIndexMountedStateChanged(prevState);

        /* Search state changed. */
        this.searchStateChanged(prevState);

        /* Results state changed. */
        this.setOfResultsBySearchGroupsStateChanged(prevState);
    }

    componentWillUnmount() {

        this.setState = ({
            dashboardIndex: [],
            dashboardIndexMounted: false,
            inputValue: "",
            query: "",
            searchURL: "",
            selectedTermsByFacet: new Map(),
            setOfCountResultsByFacet: new Map(),
            setOfResults: new Set(),
            setOfResultsBySearchGroups: new Map(),
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

        const selectedTermsByFacet = this.getSelectedTermsByFacet(facetsByTerm, inputValue, termsChecked);

        /* Update state selectedTermsByFacet. */
        this.setState({selectedTermsByFacet: new Map(selectedTermsByFacet)});

        // Convert selected terms to valid query string object
        return new URLSearchParams(selectedTermsByFacet).toString();
    };

    dashboardIndexMountedStateChanged = (prevState) => {

        const {dashboardIndexMounted} = this.state;

        const stateChanged = ( prevState.dashboardIndexMounted !== dashboardIndexMounted );

        if ( stateChanged ) {

            /* Update selected terms by facet. */
            this.updateSelectedTermsByFacet();

            /* Update set of results. */
            this.updateSetOfResults();
        }
    };

    fetchDashboardIndex = () => {

        const {dashboardIndexFileName} = this.props;

        fetch(dashboardIndexFileName)
            .then(res => res.json())
            .then(data => {
                const index = lunr.Index.load(data);
                this.setState({dashboardIndex: index, dashboardIndexMounted: true})
            })
            .catch(err => {
                console.log(err, "Error loading index");
            })
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

    getSelectedTermsByFacet = (facetsByTerm, inputValue, termsChecked) => {

        const selectedTermsByFacet = [...facetsByTerm.keys()]
            .reduce((accum, term) => {

                // Only add term to current query if it's currently selected
                if (termsChecked.get(term)) {

                    const facet = facetsByTerm.get(term);

                    // A term as already been added to the current query for this facet; add term to existing array
                    if (accum.has(facet)) {

                        accum.get(facet).push(term);
                    }
                    // This is the first term selected for the facet, create new array containing term
                    else {

                        accum.set(facet, [term]);
                    }
                }
                return accum;
            }, new Map());

        if (inputValue) {

            selectedTermsByFacet.set("search", inputValue.split(" "));
        }

        return selectedTermsByFacet;
    };

    getSelectedSearchTerms = (selectedTerms) => {

        const {termSearchValueByTermDisplay} = this.props;

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

        const {setOfSearchGroups} = this.props;

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

        const {facetsByTerm} = this.props;
        const {termsChecked} = this.state;

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

        const inputValueStr = this.getURLParams().get("search") || "";
        const inputStr = inputValueStr.replace(/,/g, " ");

        this.setState({inputValue: inputStr});
    };

    initializeSearchURL = () => {

        this.setState({searchURL: window.location.href});
    };

    initializeTermsChecked = () => {

        const {setOfTerms} = this.props;

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

    onHandleClearFacets = () => {

        const {termsChecked} = this.state;
        const termsCheckedClone = new Map(termsChecked);

        [...termsCheckedClone].forEach(([term, checked]) => {

            if ( checked ) {

                termsCheckedClone.set(term, false);
            }
        });

        this.onHandleUpdateFacets(termsCheckedClone);
    };

    onHandleUpdateFacets = (termsCheckedClone, value, checked) => {

        /** Get tracking values for selected facet */
        const {facetsByTerm} = this.props;
        const previousQuery = this.state.query;
        const currentQuery = this.buildQuery(facetsByTerm, this.state.inputValue, termsCheckedClone);

        /* Update state. */
        this.setState({
            termsChecked: termsCheckedClone,
            query: currentQuery
        });

        /* Execute tracking */
        if ( value ) {

            AnvilGTMService.trackSearchFacetSelected(
                facetsByTerm.get(value), value, checked, currentQuery, previousQuery, GAEntityType.WORKSPACE);
        }
    };

    onHandleUpdateSearch = (inputValue) => {

        if ( this.isInputDenied(inputValue) ) {

            return;
        }

        /* Track input */
        const previousQuery = this.state.query;
        const {facetsByTerm} = this.props;

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

            /* Update selected terms by facet. */
            this.updateSelectedTermsByFacet();

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

        const {dashboardPathname} = this.props;
        const {query} = this.state;
        const pathname = dashboardPathname.slice(1);

        const params = new URLSearchParams();
        params.set("query", query);
        const searchURL = `${EnvironmentService.getCurrentEnvironmentURL()}${pathname}?${params.toString()}`;

        this.setState({searchURL: searchURL});

        /* Push to URL. */
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    updateSelectedTermsByFacet = () => {

        const {facetsByTerm} = this.props;
        const {inputValue, termsChecked} = this.state;

        const selectedTermsByFacet = this.getSelectedTermsByFacet(facetsByTerm, inputValue, termsChecked);

        /* Update state selectedTermsByFacet. */
        this.setState({selectedTermsByFacet: new Map(selectedTermsByFacet)});
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

        const {facetsByTerm} = this.props;
        const {setOfResultsBySearchGroups} = this.state;

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
        const {children, checkboxGroups, countLabel, dashboardEntities, facetsByTerm, resultKey,
                setOfSummaryKeyTerms, summaryKey, tableHeadersEntities, tableHeadersSummary, totalsWarning} = this.props,
            {inputValue, searchURL, selectedTermsByFacet, setOfCountResultsByFacet, setOfResults, termsChecked,
                onHandleChecked, onHandleClearFacet, onHandleClearInput, onHandleClearSearch, onHandleClearTerm, onHandleInput} = this.state;
        const entities = DashboardService.filterDashboardEntities(dashboardEntities, setOfResults, resultKey);
        const termsCount = DashboardSearchService.getCountsByTerm(facetsByTerm, setOfCountResultsByFacet, dashboardEntities, resultKey);
        const selectedSummaryTerms = selectedTermsByFacet.get(summaryKey);
        const setOfSummaryTerms = DashboardSummaryService.getDashboardSummarySetOfSummaryTerms(termsCount, setOfSummaryKeyTerms, selectedSummaryTerms);
        const summaries = DashboardSummaryService.getDashboardSummary(entities, summaryKey ,tableHeadersSummary, setOfSummaryTerms);
        const warning = totalsWarning ? <span><sup>* </sup>Totals are adjusted for project data hosted in multiple {summaryKey}.</span> : null;
        return (
            <ContextDashboard.Provider
                value={{checkboxGroups, countLabel, entities, inputValue, searchURL, selectedTermsByFacet, setOfResults, setOfSummaryKeyTerms, summaries,
                    tableHeadersEntities, tableHeadersSummary, termsChecked, termsCount, warning,
                    onHandleChecked, onHandleClearFacet, onHandleClearInput, onHandleClearSearch, onHandleClearTerm, onHandleInput}}>
                {children}
            </ContextDashboard.Provider>
        )
    }
}

export default ProviderDashboard;
