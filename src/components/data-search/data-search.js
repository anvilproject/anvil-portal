/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataSearchCheckboxes from "../data-search-checkboxes/data-search-checkboxes";
import DataSearchEmptyResults from "../data-search-empty-results/data-search-empty-results";
import DataSearchInput from "../data-search-input/data-search-input";

// Styles
import compStyles from "./data-search.module.css";

class DataSearch extends React.Component {

    render() {
        return (
            <div className={compStyles.search}>
                <DataSearchInput/>
                <DataSearchCheckboxes/>
                <DataSearchEmptyResults/>
            </div>
        )
    };
}

export default DataSearch;
