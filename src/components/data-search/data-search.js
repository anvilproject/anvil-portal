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

// Styles
import compStyles from "./data-search.module.css";

class DataSearch extends React.Component {

    render() {
        return (
            <DashboardFilterContext.Consumer>
                {({dashboardFilterProps, onChange}) => (
                    <>
                    <input className={compStyles.search}
                           placeholder={"Search"}
                           type="text"
                           value={dashboardFilterProps.query}
                           onChange={(e) => onChange(e)}/>
                    {dashboardFilterProps.resultsExist ? null : <p className={compStyles.error}>No results. Try using wildcards "*".</p>}
                    </>
                )}
            </DashboardFilterContext.Consumer>
        )
    };
}

export default DataSearch;
