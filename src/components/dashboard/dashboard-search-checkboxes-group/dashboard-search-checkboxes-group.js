/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard checkboxes group component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardSearchCheckbox from "../dashboard-search-checkbox/dashboard-search-checkbox";
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";

function DashboardSearchCheckboxesGroup(props) {

    const {checkboxes, groupName} = props;
    const {countLabel} = useContext(ContextDashboard);

    return (
        <DashboardSearchPanel>
            <span id="group">
                <span>{groupName}</span>
                <span>{countLabel}</span>
            </span>
            {checkboxes.map((checkbox, c) => <DashboardSearchCheckbox key={c} checkbox={checkbox}/>)}
        </DashboardSearchPanel>
    )
}

export default DashboardSearchCheckboxesGroup;
