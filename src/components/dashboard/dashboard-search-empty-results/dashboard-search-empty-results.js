/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search empty results component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";

// Styles
import compStyles from "./dashboard-search-empty-results.module.css";

class DashboardSearchEmptyResults extends React.Component {

    render() {
        return (
            <DashboardSearchPanel stretch>
                <div className={compStyles.error}>No results</div>
            </DashboardSearchPanel>
        )
    }
}

export default () => {

    /* Dataset filtering props. */
    const searching = useContext(ContextDashboard),
        {setOfResults} = searching;

    const showEmptyResults = setOfResults.size === 0;

    return (
        showEmptyResults ? <DashboardSearchEmptyResults/> : null
    )
}
