/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard checkboxes group component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import DashboardSearchCheckbox from "../dashboard-search-checkbox/dashboard-search-checkbox";
import DashboardSearchCheckboxesShowMore from "../dashboard-search-checkboxes-show-more/dashboard-search-checkboxes-show-more";
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";
import ContextModal from "../../modal/context-modal/context-modal";

function DashboardSearchCheckboxesGroup(props) {

    const {checkboxes, countLabel, groupName} = props;
    const {onOpenModal} = useContext(ContextModal);
    const boxComponents = checkboxes.map((checkbox, c) => <DashboardSearchCheckbox key={c} checkbox={checkbox}/>);
    const counter = checkboxes.length;
    const moreCount = counter - 5;
    const snippets = checkboxes.slice(0, 5);

    const onShowMore = () => {

        onOpenModal({boxComponents: boxComponents, groupName: groupName});
    };

    return (
        <DashboardSearchPanel>
            <span id="group">
                <span>{groupName}</span>
                <span>{countLabel}</span>
            </span>
            {snippets.map((checkbox, c) => <DashboardSearchCheckbox key={c} checkbox={checkbox}/>)}
            <DashboardSearchCheckboxesShowMore moreCount={moreCount} onShowMore={onShowMore}/>
        </DashboardSearchPanel>
    )
}

export default DashboardSearchCheckboxesGroup;
