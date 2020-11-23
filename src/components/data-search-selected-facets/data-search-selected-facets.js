/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search selected facets component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataSearchSelectedFacet from "../data-search-selected-facet/data-search-selected-facet";

// Styles
import compStyles from "./data-search-selected-facets.module.css";

function DataSearchSelectedFacets(props) {

    const {onHandleClearFacet, onHandleClearTerm, selectedTermsByFacet} = props;
    const selectedFacets = selectedTermsByFacet.keys();

    return (
        <>
            <span className={compStyles.selectedFacets}>Results have</span>
            {[...selectedFacets].map((facet, f) =>
                <DataSearchSelectedFacet key={f}
                                         facet={facet}
                                         first={f===0}
                                         onHandleClearFacet={onHandleClearFacet}
                                         onHandleClearTerm={onHandleClearTerm}
                                         selectedTermsByFacet={selectedTermsByFacet}/>)}
        </>
    )
}

export default DataSearchSelectedFacets;
