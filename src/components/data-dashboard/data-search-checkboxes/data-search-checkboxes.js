/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search checkboxes component.
 * Wrapper component handling checkbox component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import Checkboxes from "../../checkboxes/checkboxes";
import ContextDashboardFilter from "../context-dashboard-filter/context-dashboard-filter";

class DataSearchCheckboxes extends React.Component {

    shouldComponentUpdate(_) {

        const {checkboxGroups} = this.props;

        /* Update component if checkboxGroups is undefined. */
        return checkboxGroups.length === 0;
    }

    render() {
        const {checkboxGroups} = this.props;
        return (
            checkboxGroups.map((checkboxGroup, c) =>
                <Checkboxes key={c}
                            checkboxes={checkboxGroup.checkboxes}
                            groupName={checkboxGroup.groupName}/>)
        )
    };
}

export default () => {

    const {checkboxGroups} = useContext(ContextDashboardFilter);

    return (
        <DataSearchCheckboxes checkboxGroups={checkboxGroups}/>
    )
}
