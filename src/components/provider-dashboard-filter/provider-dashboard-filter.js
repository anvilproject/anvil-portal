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
import {DashboardSearchCheckboxWorkspaceProperties} from "../../utils/dashboard/dashboard-search-workspace-property.model";

// Template variables
const DASHBOARD_INDEX = "/dashboard-index.json";
const denyListInputs = ["^", "~", ":"];

class ProviderDashboardFilter extends React.Component {

    constructor(props) {
        super(props);

        this.onHandleChecked = (event) => {

            const checkboxesClone = [...this.state.checkboxes];

            /* Get the checkbox index. */
            const checkboxIndex = this.getCheckedCheckboxIndex(checkboxesClone, event.value);

            /* Clone the checkbox and update the clone with new value. */
            const checkboxClone = {...checkboxesClone[checkboxIndex], ...event};

            /* Update the checkbox clone with the revised value. */
            checkboxesClone.splice(checkboxIndex, 1, checkboxClone);

            /* Update state. */
            this.setState({checkboxes: checkboxesClone});
        };

        this.onHandleInput = (event) => {

            const inputValue = event.target.value;

            if ( this.isInputDenied(inputValue) ) {

                return;
            }

            /* Update inputValue state. */
            this.setState({inputValue: inputValue});
        };

        this.onInitializeCheckboxes = (event) => {

            this.setState({checkboxes: event});
        };

        this.state = ({
            checkboxes: [],
            dashboardIndex: [],
            inputValue: "",
            querying: false,
            results: [],
            resultsExist: true,
            onHandleChecked: this.onHandleChecked,
            onHandleInput: this.onHandleInput,
            onInitializeCheckboxes: this.onInitializeCheckboxes
        });
    }

    componentWillUnmount() {

        this.setState = ({
            checkboxes: [],
            dashboardIndex: [],
            inputValue: "",
            querying: false,
            results: [],
            resultsExist: true,
        });
    }

    componentDidMount() {

        /* Grab the index. */
        fetch(DASHBOARD_INDEX)
            .then(res => res.json())
            .then(res => {
                const dashboardIndex = lunr.Index.load(res);

                this.setState({dashboardIndex: dashboardIndex})
            })
            .catch(err => {
                console.log(err, "Error loading index");
            });
    }

    componentDidUpdate(_, prevState) {

        this.searchStateChanged(prevState);
    }

    buildCheckedValueString = (checkboxes) => {

        if ( checkboxes.length ) {

            return checkboxes.map(checkedBox => `${checkedBox.property}: ${checkedBox.value}`).join(" ");
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

    filterCheckedCheckboxesByProperty = (checkboxes, property) => {

        return checkboxes.filter(checkbox => checkbox.checked && checkbox.property === property);
    };

    findMultiplicateResults = (resultsByGroup) => {

        /* Determine the count of groups that have a list of results. This counter is then used to create a set of
        /* results where each result must exist within each group's list of results.
        /* For example, if two checkboxes are selected from different properties e.g. "CMG" from property "consortia"
        /* and "Researcher" from property "accessUI" the resulting set should only include workspaces that exist in both groups.
        /* Noting, in this instance, both groups are workspace properties.
        /* The counter will be "2" (i.e. results from two properties with selected values) and this counter is used to confirm
        /* that any workspace must appear twice in the results array. */
        const counter = resultsByGroup.reduce((acc, results) => {

            if ( results.length ) {

                acc++;
            }

            return acc;
        }, 0);

        const setOfResults = new Set();

        /* Create a counter for each workspace's appearance within each group. If the counter matches the expect counter from
        /* above, then add the workspace to the set. */
        resultsByGroup.reduce((acc, results) => {

            /* Handle case where group has no results - early exit. */
            if ( !results ) {

                return acc;
            }

            results.forEach(result => {

                /* Get the accumulator counter for the result. */
                const resultCounter = acc.get(result);

                if ( !resultCounter ) {

                    /* If the result is not yet mapped, then add the result to the map with counter = 1. */
                    acc.set(result, 1);
                }
                else {

                    /* If the result is mapped, increment the counter. */
                    acc.set(result, resultCounter + 1);
                }

                if ( acc.get(result) === counter ) {

                    /* Add to the set of results, if the result counter is equivalent to the expected counter across all results. */
                    setOfResults.add(result);
                }
            });

            return acc;
        }, new Map());

        return [...setOfResults];
    };

    getCheckedCheckboxesByProperties = () => {

        const {checkboxes} = this.state;

        return DashboardSearchCheckboxWorkspaceProperties.map(property => {

            const checkedBoxes = this.filterCheckedCheckboxesByProperty(checkboxes, property);

            return {
                checkboxes: checkedBoxes,
                property: property
            }
        });

    };

    getCheckedCheckboxIndex = (checkboxesClone, checkboxValue) => {

        return checkboxesClone.findIndex(checkboxClone => checkboxClone.value === checkboxValue);
    };

    getCheckedResults = () => {

        /* Get any checked boxes, by property. */
        const checkedBoxesByProperties = this.getCheckedCheckboxesByProperties();

        /* Get any results, by property. Results are retrieved by property to retain "OR" searching amongst properties. */
        return this.getCheckedResultsByProperty(checkedBoxesByProperties);
    };

    getCheckedResultsByProperty = (checkedBoxesByProperty) => {

        return checkedBoxesByProperty.map(checkedByProperty => {

            const checkedBoxes = checkedByProperty.checkboxes;

            const checkedQueryString = this.buildCheckedValueString(checkedBoxes);

            return this.getSearchResults(checkedQueryString);
        });
    };

    getInputResults = () => {

        const {inputValue} = this.state;
        const inputString = this.buildInputValueString(inputValue);

        return this.getSearchResults(inputString);
    };

    getMultiplicatedResults = (checkedResults, inputResults) => {

        /* Handle case where inputting returns empty results. */
        /* In this instance, all results will be null due to the "AND" between inputting and properties. */
        if ( this.isInputtingNullResults(inputResults) ) {

            return [];
        }

        /* Join input results with checked results. */
        const results = [...checkedResults, inputResults];

        /* Return multiplicate results. */
        return this.findMultiplicateResults(results);
    };

    getResults = () => {

        /* Get the checked results. */
        const checkedResults = this.getCheckedResults();

        /* Get the input results. */
        const inputResults = this.getInputResults();

        /* Return any multiplicated results. Searching will be "AND" between properties and input. */
        return this.getMultiplicatedResults(checkedResults, inputResults);
    };

    getSearchResults = (query) => {

        if ( !query ) {

            return [];
        }

        const {dashboardIndex} = this.state;

        const queryString = `${query}`;
        const results = dashboardIndex.search(queryString);

        return results.map(result => result.ref)
    };

    isCheckboxing = () => {

        const {checkboxes} = this.state;

        return checkboxes.some(checkbox => checkbox.checked);
    };

    isInputDenied = (inputValue) => {

        return denyListInputs.some(deniedInput => inputValue.includes(deniedInput));
    };

    isInputting = () => {

        const {inputValue} = this.state;

        return !!inputValue;
    };

    isInputtingNullResults = (inputResults) => {

        return this.isInputting() && !inputResults.length;
    };

    isResults = (results) => {

        if ( this.isCheckboxing() || this.isInputting() ) {

            return results.length > 0;
        }

        return true;
    };

    searchStateChanged = (prevState) => {

        const {inputValue, checkboxes} = this.state;

        const stateChanged = ( prevState.inputValue !== inputValue ) || ( prevState.checkboxes !== checkboxes );

        if ( stateChanged ) {

            const querying = this.isCheckboxing() || this.isInputting();

            /* Update state - querying. */
            this.setState({querying: querying});

            /* Update results. */
            this.updateResults();
        }
    };

    updateResults = () => {

        const {querying} = this.state;

        /* Get the results. */
        const results = this.getResults();

        const resultsExist = ( this.isResults(results) && querying ) || !querying;

        this.setState({results: results, resultsExist: resultsExist});
    };

    render() {
        const {children} = this.props;
        return (
            <DashboardFilterContext.Provider value={this.state}>
                {children}
            </DashboardFilterContext.Provider>
        )
    }
}

export default ProviderDashboardFilter;
