/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search selected facets component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardSearchSelectedFacet from "../dashboard-search-selected-facet/dashboard-search-selected-facet";

// Styles
import compStyles from "./dashboard-search-selected-facets.module.css";

function DashboardSearchSelectedFacets(props) {

    const {onHandleClearFacet, onHandleClearTerm, selectedTermsByFacet} = props;
    const selectedFacets = selectedTermsByFacet.keys();

    return (
        <>
        <span className={compStyles.selectedFacets}>Current selection:</span>
        {[...selectedFacets].map((facet, f) =>
            <DashboardSearchSelectedFacet key={f}
                                          facet={facet}
                                          first={f===0}
                                          onHandleClearFacet={onHandleClearFacet}
                                          onHandleClearTerm={onHandleClearTerm}
                                          selectedTermsByFacet={selectedTermsByFacet}/>)}
        </>
    )
}

export default DashboardSearchSelectedFacets;
