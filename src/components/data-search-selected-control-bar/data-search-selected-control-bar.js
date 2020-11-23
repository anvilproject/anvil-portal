/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search selected control bar component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import DashboardFilterContext from "../context/dashboard-filter-context";
import DataSearchSelectedClearAll from "../data-search-selected-clear-all/data-search-selected-clear-all";
import DataSearchSelectedFacets from "../data-search-selected-facets/data-search-selected-facets";

// Styles
import compStyles from "./data-search-selected-control-bar.module.css";

function DataSearchSelectedControlBar() {

    const {selectedTermsByFacet, onHandleClearFacet, onHandleClearSearch, onHandleClearTerm} = useContext(DashboardFilterContext);
    const showController = selectedTermsByFacet.size > 0;

    return (
        <div className={compStyles.controlBar}>
            {showController ?
                <><DataSearchSelectedFacets onHandleClearFacet={onHandleClearFacet}
                                            onHandleClearTerm={onHandleClearTerm}
                                            selectedTermsByFacet={selectedTermsByFacet}/>
                <DataSearchSelectedClearAll onHandleClearSearch={onHandleClearSearch}/></> :
                <span>No selected terms.</span>}
        </div>
    )
}

export default DataSearchSelectedControlBar;
