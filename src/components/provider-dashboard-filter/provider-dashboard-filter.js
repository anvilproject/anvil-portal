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
import DashboardFilterContext from "../context/dashboard-filter-context";
import * as DashboardSearchService from "../../utils/dashboard/dashboard-search.service";
import * as DashboardSummaryService from "../../utils/dashboard/dashboard-summary.service";
import * as DashboardWorkspaceService from "../../utils/dashboard/dashboard-workspace.service";

// Template variables
const DASHBOARD_INDEX = "/dashboard-index.json";

class ProviderDashboardFilter extends React.Component {

    constructor(props) {
        super(props);

        this.onHandleChecked = (event) => {

            const {checked, value} = event;

            /* Clone state variable termsChecked. */
            const termsCheckedClone = new Map(this.state.termsChecked);

            /* Update clone. */
            termsCheckedClone.set(value, checked);

            /* Update state. */
            this.setState({termsChecked: termsCheckedClone});
        };

        this.onHandleInput = (event) => {

            const inputValue = event.target.value;

            if ( this.isInputDenied(inputValue) ) {

                return;
            }

            /* Update inputValue state. */
            this.setState({inputValue: inputValue});
        };

        this.state = ({
            dashboardIndex: [],
            dashboardIndexMounted: false,
            inputValue: "",
            setOfCountResultsByFacet: new Map(),
            setOfResults: new Set(),
            setOfResultsBySearchGroups: new Map(),
            termsChecked: new Map(),
            onHandleChecked: this.onHandleChecked,
            onHandleInput: this.onHandleInput,
        });
    }

    componentWillUnmount() {

        this.setState = ({
            dashboardIndex: [],
            dashboardIndexMounted: false,
            inputValue: "",
            setOfCountResultsByFacet: new Map(),
            setOfResults: new Set(),
            setOfResultsBySearchGroups: new Map(),
            termsChecked: new Map()
        });
    }

    componentDidMount() {

        /* Grab the index. */
        this.fetchDashboardIndex();

        /* Initialize the state "termsChecked". */
        this.initializeTermsChecked();
    }

    componentDidUpdate(_, prevState) {

        this.dashboardIndexMountedStateChanged(prevState);

        this.searchStateChanged(prevState);

        this.setOfResultsBySearchGroupsStateChanged(prevState);
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

    dashboardIndexMountedStateChanged = (prevState) => {

        const {dashboardIndexMounted} = this.state;

        const stateChanged = ( prevState.dashboardIndexMounted !== dashboardIndexMounted );

        if ( stateChanged ) {

            /* Update set of results. */
            this.updateSetOfResults();
        }
    };

    fetchDashboardIndex = () => {

        fetch(DASHBOARD_INDEX)
            .then(res => res.json())
            .then(res => {
                const dashboardIndex = lunr.Index.load(res);

                this.setState({dashboardIndex: dashboardIndex, dashboardIndexMounted: true})
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

    getTermsChecked = (facet) => {

        const {facetsByTerm} = this.props,
            {termsChecked} = this.state;

        return [...termsChecked].reduce((acc, [term, checked]) => {

            const termInFacet = facetsByTerm.get(term) === facet;

            if ( termInFacet && checked ) {

                acc.push(term);
            }

            return acc;
        }, []);
    };

    getSetOfFacetedResults = (facet) => {

        /* Grab any checked terms for the facet. */
        const selectedTerms = this.getTermsChecked(facet);

        /* Build the query string. */
        const facetQueryString = this.buildFacetQueryString(selectedTerms, facet);

        return this.getResultsByQuery(facetQueryString);
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

    initializeTermsChecked = () => {

        const {setOfTerms} = this.props;

        const termsChecked = new Map();

        [...setOfTerms].forEach(term => termsChecked.set(term, false));

        this.setState({termsChecked: termsChecked});
    };

    isInputDenied = (inputValue) => {

        return DashboardSearchService.DenyListInputs.some(deniedInput => inputValue.includes(deniedInput));
    };

    searchStateChanged = (prevState) => {

        const {dashboardIndexMounted, inputValue, termsChecked} = this.state;

        const inputValueChanged = prevState.inputValue !== inputValue;
        const termsCheckedChanged = prevState.termsChecked !== termsChecked;

        const stateChanged = inputValueChanged || termsCheckedChanged;

        if ( dashboardIndexMounted && stateChanged ) {

            /* Update set of results. */
            this.updateSetOfResults();
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

        const {facetsByTerm} = this.props,
            {setOfResultsBySearchGroups} = this.state;

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
        const {checkboxGroups, children, facetsByTerm, workspacesQuery} = this.props,
            {inputValue, setOfCountResultsByFacet, setOfResults, termsChecked,
                onHandleChecked, onHandleInput} = this.state;
        const workspaces = DashboardWorkspaceService.getDashboardWorkspaces(workspacesQuery, setOfResults);
        const summaries = DashboardSummaryService.getDashboardSummary(workspaces);
        const termsCount = DashboardSearchService.getCountsByTerm(facetsByTerm, setOfCountResultsByFacet, workspacesQuery);
        return (
            <DashboardFilterContext.Provider
                value={{checkboxGroups, inputValue, setOfResults, summaries, termsChecked, termsCount, workspaces,
                    onHandleChecked, onHandleInput}}>
                {children}
            </DashboardFilterContext.Provider>
        )
    }
}

export default ProviderDashboardFilter;
