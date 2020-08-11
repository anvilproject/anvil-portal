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
            inputValue: "",
            querying: false,
            setOfResults: new Set(),
            termsChecked: new Map(),
            onHandleChecked: this.onHandleChecked,
            onHandleInput: this.onHandleInput,
        });
    }

    componentWillUnmount() {

        this.setState = ({
            dashboardIndex: [],
            inputValue: "",
            querying: false,
            setOfResults: new Set(),
            termsChecked: new Map(),
        });
    }

    componentDidMount() {

        /* Grab the index. */
        this.fetchDashboardIndex();

        /* Initialize the state "termsChecked". */
        this.initializeTermsChecked();
    }

    componentDidUpdate(_, prevState) {

        this.searchStateChanged(prevState);
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

    fetchDashboardIndex = () => {

        fetch(DASHBOARD_INDEX)
            .then(res => res.json())
            .then(res => {
                const dashboardIndex = lunr.Index.load(res);

                this.setState({dashboardIndex: dashboardIndex})
            })
            .catch(err => {
                console.log(err, "Error loading index");
            });
    };

    filterSelectedTerms = (terms) => {

        const {termsChecked} = this.state;

        return terms.filter(term => termsChecked.get(term));
    };

    findIntersectionSetOfResults = (setsOfResults) => {

        if ( !setsOfResults.length ) {

            return new Set();
        }

        const lastSet = setsOfResults.pop();

        return new Set([...lastSet].filter(result => {

            return [...setsOfResults].every(setOfResults => setOfResults.has(result));
        }));
    };

    getCheckedResults = () => {

        /* Get the selected terms for each facet. */
        const selectedTermsByFacets = this.getSelectedTermsByFacets();

        /* Get any results, by facet. Results are retrieved by facet to retain "OR" searching amongst facets. */
        return this.getCheckedResultsByFacet(selectedTermsByFacets);
    };

    getCheckedResultsByFacet = (selectedTermsByFacets) => {

        /* Only return a set of checked results, if the facet has selected terms. */
        return selectedTermsByFacets.reduce((acc, selectedTermsByFacet) => {

            const {selectedTerms, facet} = selectedTermsByFacet;

            if ( selectedTerms.length ) {

                const facetQueryString = this.buildFacetQueryString(selectedTerms, facet);

                acc.push(this.getResultsByQuery(facetQueryString));
            }

            return acc;
        }, []);
    };

    getInputResults = () => {

        const {inputValue} = this.state;
        const inputString = this.buildInputValueString(inputValue);

        return this.getResultsByQuery(inputString);
    };

    getIntersectionSetsOfResults = (checkedResults, inputResults) => {

        /* Handle case where inputting returns empty results. */
        /* In this instance, all results will be null due to the "AND" between inputting and facets. */
        if ( this.isInputtingNullResults(inputResults) ) {

            return new Set();
        }

        /* Join input results with checked results. */
        let resultsSets = [...checkedResults];

        if ( inputResults.size ) {

            resultsSets.push(inputResults);
        }

        /* Return intersection sets. */
        return this.findIntersectionSetOfResults(resultsSets);
    };

    getResultsByQuery = (query) => {

        if ( !query ) {

            return new Set();
        }

        const {dashboardIndex} = this.state;

        const queryString = `${query}`;
        const results = dashboardIndex.search(queryString);

        return new Set(results.map(result => result.ref));
    };

    getSelectedTermsByFacets = () => {

        const {termsByFacets} = this.props;

        return [...termsByFacets].map(([facet, terms]) => {

            const selectedTerms = this.filterSelectedTerms(terms);

            return {
                selectedTerms: selectedTerms,
                facet: facet
            }
        });

    };

    getSetOfResults = () => {

        /* Get the checked results. */
        const checkedResults = this.getCheckedResults();

        /* Get the input results. */
        const inputResults = this.getInputResults();

        /* Return any intersecting sets of results. i.e. searching will be "AND" between facets and input. */
        return this.getIntersectionSetsOfResults(checkedResults, inputResults);
    };

    initializeTermsChecked = () => {

        const {setOfTerms} = this.props;

        const termsChecked = new Map();

        [...setOfTerms].forEach(term => termsChecked.set(term, false));

        this.setState({termsChecked: termsChecked});
    };

    isCheckboxing = () => {

        const {termsChecked} = this.state;

        return [...termsChecked.keys()].some(term => termsChecked.get(term));
    };

    isInputDenied = (inputValue) => {

        return DashboardSearchService.DenyListInputs.some(deniedInput => inputValue.includes(deniedInput));
    };

    isInputting = () => {

        const {inputValue} = this.state;

        return !!inputValue;
    };

    isInputtingNullResults = (setOfInputResults) => {

        return this.isInputting() && setOfInputResults.size === 0;
    };

    searchStateChanged = (prevState) => {

        const {inputValue, termsChecked} = this.state;

        const stateChanged = ( prevState.inputValue !== inputValue ) || ( prevState.termsChecked !== termsChecked );

        if ( stateChanged ) {

            const querying = this.isCheckboxing() || this.isInputting();

            /* Update state - querying. */
            this.setState({querying: querying});

            /* Update results. */
            this.updateSetOfResults();
        }
    };

    updateSetOfResults = () => {

        /* Get the set of results. */
        const setOfResults = this.getSetOfResults();

        this.setState({setOfResults: setOfResults});
    };

    render() {
        const {checkboxGroups, children, facetByTerm, workspacesQuery} = this.props,
            {inputValue, querying, setOfResults, termsChecked,
                onHandleChecked, onHandleInput} = this.state;
        const workspaces = DashboardWorkspaceService.getDashboardWorkspaces(workspacesQuery, setOfResults, querying);
        const summaries = DashboardSummaryService.getDashboardSummary(workspaces);
        const termsCount = DashboardSearchService.getCountsByTerms(termsChecked, facetByTerm, workspaces);
        return (
            <DashboardFilterContext.Provider
                value={{checkboxGroups, inputValue, querying, setOfResults, summaries, termsChecked, termsCount, workspaces,
                    onHandleChecked, onHandleInput}}>
                {children}
            </DashboardFilterContext.Provider>
        )
    }
}

export default ProviderDashboardFilter;
