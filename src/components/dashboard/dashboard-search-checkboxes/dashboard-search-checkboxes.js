/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search checkboxes component.
 * Wrapper component handling checkbox component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardSearchCheckboxesGroup from "../dashboard-search-checkboxes-group/dashboard-search-checkboxes-group";

class DashboardSearchCheckboxes extends React.Component {

    shouldComponentUpdate(_) {

        return false;
    }

    render() {
        const {checkboxGroups} = this.props;
        return (
            checkboxGroups.map((checkboxGroup, c) =>
                <DashboardSearchCheckboxesGroup key={c}
                                                checkboxes={checkboxGroup.checkboxes}
                                                groupName={checkboxGroup.groupName}/>)
        )
    };
}

export default () => {

    const searching = useContext(ContextDashboard),
    {checkboxGroups} = searching;

    return (
        <DashboardSearchCheckboxes checkboxGroups={checkboxGroups}/>
    )
}
