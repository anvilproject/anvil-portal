/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - checkboxes component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import Checkbox from "../checkbox/checkbox";
import ContextDashboardFilter from "../data-dashboard/context-dashboard-filter/context-dashboard-filter";
import DataSearchPanel from "../data-dashboard/data-search-panel/data-search-panel";

function Checkboxes(props) {

    const {checkboxes, groupName} = props;
    const {countLabel} = useContext(ContextDashboardFilter);

    return (
        <DataSearchPanel>
                <span id="group">
                    <span>{groupName}</span>
                    <span>{countLabel}</span>
                </span>
            {checkboxes.map((checkbox, c) => <Checkbox key={c} checkbox={checkbox}/>)}
        </DataSearchPanel>
    )
}

export default Checkboxes;
