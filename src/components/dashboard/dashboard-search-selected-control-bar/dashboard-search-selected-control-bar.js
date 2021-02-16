/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search selected control bar component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardSearchSelectedClearAll from "../dashboard-search-selected-clear-all/dashboard-search-selected-clear-all";
import DashboardSearchSelectedFacets from "../dashboard-search-selected-facets/dashboard-search-selected-facets";

// Styles
import compStyles from "./dashboard-search-selected-control-bar.module.css";

function DashboardSearchSelectedControlBar() {

    const {selectedTermsByFacet, onHandleClearFacet, onHandleClearSearch, onHandleClearTerm} = useContext(ContextDashboard);
    const showController = selectedTermsByFacet.size > 0;

    return (
        <div className={compStyles.controlBar}>
            {showController ?
                <><DashboardSearchSelectedFacets onHandleClearFacet={onHandleClearFacet}
                                                 onHandleClearTerm={onHandleClearTerm}
                                                 selectedTermsByFacet={selectedTermsByFacet}/>
                <DashboardSearchSelectedClearAll onHandleClearSearch={onHandleClearSearch}/></> :
                <span>No selected terms.</span>}
        </div>
    )
}

export default DashboardSearchSelectedControlBar;
