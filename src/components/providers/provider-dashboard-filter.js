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

// Template variables
const denyListInputs = ["^", "~", ":"];
const DASHBOARD_INDEX = "/dashboard-index.json";

class ProviderDashboardFilter extends React.Component {

    constructor(props) {
        super(props);

        this.onHandleChange = (event) => {

            const inputValue = event.target.value;

            if ( this.isInputDenied(inputValue) ) {

                return;
            }

            /* Update inputValue state. */
            this.setState({inputValue: inputValue});
        };

        this.onHandleChecked = (event) => {

            const checkboxesClone = [...this.state.checkboxes];

            /* Get the checkbox index. */
            const checkboxIndex = this.getCheckboxIndex(checkboxesClone, event.label);

            /* Clone the checkbox and update the clone with new value. */
            const checkboxClone = {...checkboxesClone[checkboxIndex], ...event};

            /* Update the checkbox clone with the revised value. */
            checkboxesClone.splice(checkboxIndex, 1, checkboxClone);

            /* Update state. */
            this.setState({checkboxes: checkboxesClone});
        };

        this.onInitializeCheckboxes = (event) => {

            const checkboxes = event;
            const checkboxTypes = this.getCheckboxTypes(event);

            this.setState({checkboxes: checkboxes, checkboxTypes: checkboxTypes});
        };

        this.state = ({
            checkboxes: [],
            checkboxTypes: [],
            dashboardIndex: [],
            inputValue: "",
            querying: false,
            results: [],
            resultsExist: true,
            onHandleChange: this.onHandleChange,
            onHandleChecked: this.onHandleChecked,
            onInitializeCheckboxes: this.onInitializeCheckboxes
        });
    }

    componentWillUnmount() {

        this.setState = ({
            checkboxes: [],
            checkboxTypes: [],
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

        if ( ( prevState.inputValue !== this.state.inputValue ) || ( prevState.checkboxes !== this.state.checkboxes ) ) {

            const querying = this.isCheckboxing() || this.isInputting();

            this.setState({querying: querying});

            /* Update query. */
            this.updateResults();
        }
    }

    buildCheckedValueString = (checkboxes) => {

        if ( checkboxes.length ) {

            return checkboxes.map(checkedBox => `${checkedBox.type}: ${checkedBox.label}`).join(" ");
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

            return `+${inputValue}*`;
        }

        return "";
    };

    filterCheckedBoxesByType = (checkboxes, type) => {

        return checkboxes.filter(checkbox => checkbox.checked && checkbox.type === type);
    };

    getCheckboxIndex = (checkboxesClone, label) => {

        return checkboxesClone.findIndex(checkboxClone => checkboxClone.label === label);
    };

    getCheckboxTypes = (checkboxes) => {

        const setOfTypes = new Set(checkboxes.map(checkbox => checkbox.type));
        return [...setOfTypes];
    };

    getCheckedBoxesByType = () => {

        const {checkboxes, checkboxTypes} = this.state;

        return checkboxTypes.map(type => {

            const checkedBoxes = this.filterCheckedBoxesByType(checkboxes, type);

            return {
                checkboxes: checkedBoxes,
                type: type
            }
        });

    };

    getCheckedResults = () => {

        if ( this.isCheckboxing() ) {

            /* Get any checked boxes, by type. */
            const checkedBoxesByType = this.getCheckedBoxesByType();

            /* Get any results, by type. Results are retrieved by type to retain "OR" searching amongst types. */
            const checkedResultsByTypeName = this.getCheckedResultsByTypeName(checkedBoxesByType);

            /* Return results, where there are duplicates. Searching will be "AND" between types. */
            return this.joinCheckboxResults(checkedResultsByTypeName);
        }

        return [];
    };

    getCheckedResultsByTypeName = (checkedBoxesByType) => {

        return checkedBoxesByType.map(checkedByType => {

            const checkedBoxes = checkedByType.checkboxes;

            const checkedQueryStringByType = this.buildCheckedValueString(checkedBoxes);

            return this.getSearchResults(checkedQueryStringByType);
        });
    };

    getInputResults = () => {

        const {inputValue} = this.state;

        const inputString = this.buildInputValueString(inputValue);
        return this.getSearchResults(inputString);
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

    isResults = (results) => {

        if ( this.isCheckboxing() || this.isInputting() ) {

            return results.length > 0;
        }

        return true;
    };

    joinCheckboxResults = (checkedResultsByTypeName) => {

        /* Determine the count of types that have a list of results. This counter is then used to create a set of
        /* results where each result must exist within each type's list of results.
        /* For example, if two checkboxes are selected from different types e.g. "CMG" from type "Consortia"
        /* and "Researcher" from type "Access" the resulting set should only include workspaces that exist in both types.
        /* The counter will be "2" (i.e. results from two types "Consortia" and "Researcher") and this counter is used to confirm
        /* that any workspace must appear twice in the results array. */
        const counter = checkedResultsByTypeName.reduce((acc, results) => {

            if ( results.length ) {

                acc++;
            }

            return acc;
        }, 0);

        const setOfResults = new Set();

        /* Create a counter for each workspace's appearance within each type. If the counter matches the expect counter from
        /* above, then add the workspace to the set. */
        checkedResultsByTypeName.reduce((acc, results) => {

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

    joinDisimilarResults = (res1, res2) => {

        /* Join the results together. */
        const results = res1.concat(res2);

        if ( !this.isInputting() || !this.isCheckboxing() ) {

            return results;
        }

        /* Return the results, where duplicates exist. */
        return results.filter((result, i) => results.indexOf(result) !== i);
    };

    updateResults = () => {

        const {querying} = this.state;

        /* Get the checked results. */
        const checkedResults = this.getCheckedResults();

        /* Get the input results. */
        const inputResults = this.getInputResults();

        /* Join the results together with an "AND". i.e. find any duplicates. */
        const results = this.joinDisimilarResults(checkedResults, inputResults);

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
