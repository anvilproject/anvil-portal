/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Checkboxes from "../checkboxes/checkboxes";
import DashboardFilterContext from "../context/dashboard-filter-context";

// Styles
import compStyles from "./data-search.module.css";

class DataSearch extends React.Component {

    render() {
        return (
            <DashboardFilterContext.Consumer>
                {({inputValue, resultsExist, onChange}) => (
                    <>
                        <Checkboxes/>
                        <input className={compStyles.search}
                               placeholder={"Search"}
                               type="text"
                               value={inputValue}
                               onChange={(e) => onChange(e)}/>
                        {resultsExist ? null : <p className={compStyles.error}>No results.</p>}
                    </>
                )}
            </DashboardFilterContext.Consumer>
        )
    };
}

export default DataSearch;
