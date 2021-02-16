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
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";

class DashboardSearchCheckboxesGroup extends React.Component {

    render() {
        const {checkboxes, groupName} = this.props;
        return (
            <DashboardSearchPanel>
                <span id="group">
                    <span>{groupName}</span>
                    <span>Cohorts</span>
                </span>
                {checkboxes.map((checkbox, c) => <DashboardSearchCheckbox key={c} checkbox={checkbox}/>)}
            </DashboardSearchPanel>
        )
    };
}

export default DashboardSearchCheckboxesGroup;
