/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search input component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import DashboardFilterContext from "../context/dashboard-filter-context";
import DataSearchPanel from "../data-search-panel/data-search-panel";

// Styles
import compStyles from "./data-search-input.module.css";

class DataSearchInput extends React.Component {

    shouldComponentUpdate(nextProps) {

        const {inputValue} = this.props;

        return inputValue !== nextProps.inputValue;
    }

    render() {
        const {inputValue, onHandleInput} = this.props;
        return (
            <DataSearchPanel>
                <span id="group-label">Search</span>
                <input className={compStyles.input}
                       type="text"
                       placeholder={"e.g. disease, study name, dbGaP Id"}
                       value={inputValue}
                       onChange={(e) => onHandleInput(e)}/>
            </DataSearchPanel>
        )
    }
}

export default () => {

    const {inputValue, onHandleInput} = useContext(DashboardFilterContext);

    return (
        <DataSearchInput inputValue={inputValue} onHandleInput={(e) => onHandleInput(e)}/>
    )
};
