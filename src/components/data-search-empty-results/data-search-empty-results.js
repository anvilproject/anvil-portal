/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search empty results component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import DashboardFilterContext from "../context/dashboard-filter-context";
import DataSearchPanel from "../data-search-panel/data-search-panel";

// Styles
import compStyles from "./data-search-empty-results.module.css";

class DataSearchEmptyResults extends React.Component {

    render() {
        return (
            <DataSearchPanel error>
                <div className={compStyles.error}>No results</div>
            </DataSearchPanel>
        )
    }
}

export default () => {

    /* Dataset filtering props. */
    const searching = useContext(DashboardFilterContext),
        {resultsExist} = searching;

    return (
        resultsExist ? null : <DataSearchEmptyResults/>
    )
}
