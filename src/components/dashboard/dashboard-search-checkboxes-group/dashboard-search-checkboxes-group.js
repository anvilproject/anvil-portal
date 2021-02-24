/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard checkboxes group component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardSearchCheckbox from "../dashboard-search-checkbox/dashboard-search-checkbox";
import DashboardSearchCheckboxesShowMore from "../dashboard-search-checkboxes-show-more/dashboard-search-checkboxes-show-more";
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";
import ModalDashboardCheckboxSelector from "../../modal/modal-dashboard-checkbox-selector/modal-dashboard-checkbox-selector";

function DashboardSearchCheckboxesGroup(props) {

    const {checkboxes, countLabel, groupName} = props;
    const counter = checkboxes.length;
    const moreCount = counter - 5;
    const snippets = checkboxes.slice(0, 5);

    return (
        <DashboardSearchPanel>
            <span id="group">
                <span>{groupName}</span>
                <span>{countLabel}</span>
            </span>
            {snippets.map((checkbox, c) => <DashboardSearchCheckbox key={c} checkbox={checkbox}/>)}
            <DashboardSearchCheckboxesShowMore groupName={groupName} moreCount={moreCount}/>
            <ModalDashboardCheckboxSelector groupName={groupName}>
                {checkboxes.map((checkbox, c) => <DashboardSearchCheckbox key={c} checkbox={checkbox}/>)}
            </ModalDashboardCheckboxSelector>
        </DashboardSearchPanel>
    )
}

export default DashboardSearchCheckboxesGroup;
