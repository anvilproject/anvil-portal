/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL dashboard filter provider component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardFilterContext from "../context/dashboard-filter-context";

// Template variables
const inputsDenyList = ["^", "~", ":"];

class ProviderDashboardFilter extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = (event) => {

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

            this.setState({checkboxes: event});
        };

        this.state = ({
            checkboxes: [],
            dashboardIndex: window.dashboardIndex,
            inputValue: "",
            results: [],
            resultsExist: true,
            onChange: this.onChange,
            onHandleChecked: this.onHandleChecked,
            onInitializeCheckboxes: this.onInitializeCheckboxes
        });
    }

    componentWillUnmount() {

        this.setState = ({
            checkboxes: [],
            dashboardIndex: [],
            inputValue: "",
            results: [],
            resultsExist: true,
        });
    }

    componentDidUpdate(_, prevState) {

        if ( ( prevState.inputValue !== this.state.inputValue ) || ( prevState.checkboxes !== this.state.checkboxes ) ) {

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

    filterCheckboxes = (checkboxes) => {

        return checkboxes.filter(checkbox => checkbox.checked);
    };

    getCheckboxIndex = (checkboxesClone, label) => {

        return checkboxesClone.findIndex(checkboxClone => checkboxClone.label === label);
    };

    getCheckedResults = () => {

        const {checkboxes} = this.state;

        if ( this.isCheckboxing() ) {

            /* Filter checked checkboxes. */
            const checkedBoxes = this.filterCheckboxes(checkboxes);

            /* Get any dataTypes results. */
            const resultsByDateType = this.getCheckedResultsByTypeName(checkedBoxes, "dataTypes");

            /* Get any accessUI results. */
            const resultsByAccessUI = this.getCheckedResultsByTypeName(checkedBoxes, "accessUI");

            /* Return results, where there are duplicates. */
            return this.joinSimilarResults(resultsByDateType, resultsByAccessUI);
        }

        return [];
    };

    getCheckedResultsByTypeName = (checkedBoxes, typeName) => {

        /* Get any types checked. */
        const checkedByTypes = checkedBoxes.filter(checkedBoxes => checkedBoxes.type === typeName);

        const checkedQueryStringByType = this.buildCheckedValueString(checkedByTypes);

        return this.getSearchResults(checkedQueryStringByType);
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

        return inputsDenyList.some(deniedInput => inputValue.includes(deniedInput));
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

    joinDisimilarResults = (res1, res2) => {

        /* Join the results together. */
        const results = res1.concat(res2);

        if ( !this.isInputting() || !this.isCheckboxing() ) {

            return results;
        }

        /* Return the results, where duplicates exist. */
        return results.filter((result, i) => results.indexOf(result) !== i);
    };

    joinSimilarResults = (res1, res2) => {

        /* Join the results together. */
        const results = res1.concat(res2);

        /* Return the results if only one set of results exist. */
        /* i.e. there will be no duplicates. */
        if ( res1.length === 0 || res2.length === 0 ) {

            return results;
        }

        /* Return the results, where duplicates exist. */
        return results.filter((result, i) => results.indexOf(result) !== i);
    };

    updateResults = () => {

        /* Get the checked results. */
        const checkedResults = this.getCheckedResults();

        /* Get the input results. */
        const inputResults = this.getInputResults();

        /* Join the results together with an "AND". i.e. find any duplicates. */
        const results = this.joinDisimilarResults(checkedResults, inputResults);

        this.setState({results: results, resultsExist: this.isResults(results)});
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
