/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardFilterContext from "../context/dashboard-filter-context";
import DataSearchCheckboxes from "../data-search-checkboxes/data-search-checkboxes";
import DataSearchEmptyResults from "../data-search-empty-results/data-search-empty-results";
import DataSearchInput from "../data-search-input/data-search-input";

// Styles
import compStyles from "./data-search.module.css";

class DataSearch extends React.Component {

    render() {
        return (
            <DashboardFilterContext.Consumer>
                {({inputValue, onHandleInput}) => (
                    <div className={compStyles.search}>
                        <DataSearchInput inputValue={inputValue} onHandleInput={(e) => onHandleInput(e)}/>
                        <DataSearchCheckboxes/>
                        <DataSearchEmptyResults/>
                    </div>
                )}
            </DashboardFilterContext.Consumer>
        )
    };
}

export default DataSearch;
