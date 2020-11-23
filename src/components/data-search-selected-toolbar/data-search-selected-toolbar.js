/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search selected toolbar component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataSearchPanel from "../data-search-panel/data-search-panel";
import DataSearchSelectedControlBar from "../data-search-selected-control-bar/data-search-selected-control-bar";

function DataSearchSelectedToolbar() {

    return (
        <DataSearchPanel stretch>
            <DataSearchSelectedControlBar/>
        </DataSearchPanel>
    )
}

export default DataSearchSelectedToolbar;
