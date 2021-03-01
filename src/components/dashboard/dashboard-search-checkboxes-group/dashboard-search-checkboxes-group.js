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
import DashboardSearchCheckboxesShowMore from "../dashboard-search-checkboxes-show-more/dashboard-search-checkboxes-show-more";
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";
import ContextModal from "../../modal/context-modal/context-modal";
import * as DashboardSearchService from "../../../utils/dashboard/dashboard-search.service";

function DashboardSearchCheckboxesGroup(props) {

    const {checkboxes, countLabel, groupName} = props;
    const {termsCount} = useContext(ContextDashboard);
    const {onOpenModal} = useContext(ContextModal);
    const boxComponents = checkboxes.map((checkbox, c) => <DashboardSearchCheckbox key={c} checkbox={checkbox}/>);
    const snippetCount = 5; /* Only show the first five checkboxes. */
    const checkboxCount = DashboardSearchService.getDashboardCheckboxMoreCount(checkboxes, snippetCount, termsCount);
    const moreCount = checkboxCount;
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
