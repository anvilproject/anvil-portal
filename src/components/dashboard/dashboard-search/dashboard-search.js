/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardSearchCheckboxes from "../dashboard-search-checkboxes/dashboard-search-checkboxes";
import DashboardSearchEmptyResults from "../dashboard-search-empty-results/dashboard-search-empty-results";
import DashboardSearchInput from "../dashboard-search-input/dashboard-search-input";
import DashboardSearchSelectedToolbar from "../dashboard-search-selected-toolbar/dashboard-search-selected-toolbar";

// Styles
import compStyles from "./dashboard-search.module.css";

class DashboardSearch extends React.Component {

    render() {
        return (
            <div className={compStyles.search}>
                <DashboardSearchInput/>
                <DashboardSearchCheckboxes/>
                <DashboardSearchSelectedToolbar/>
                <DashboardSearchEmptyResults/>
            </div>
        )
    };
}

export default DashboardSearch;
