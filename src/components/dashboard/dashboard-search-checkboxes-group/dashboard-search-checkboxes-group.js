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
import ModalDashboardCheckboxSelector from "../../modal/modal-dashboard-checkbox-selector/modal-dashboard-checkbox-selector";

function DashboardSearchCheckboxesGroup(props) {

    const {checkboxes, groupName} = props;
    const {countLabel, onHandleChecked, termsChecked, termsCount} = useContext(ContextDashboard);
    const {onOpenModal} = useContext(ContextModal);
    const counter = checkboxes.length;
    const moreCount = counter - 4;
    const snippets = checkboxes.slice(0, 4);
    const modalProps = {
        checkboxes: checkboxes,
        countLabel: countLabel,
        groupName: groupName,
        onHandleChecked: onHandleChecked,
        termsChecked: termsChecked,
        termsCount: termsCount
    };

    const onShowMore = () => {

        onOpenModal(<ModalDashboardCheckboxSelector {...modalProps}/>)
    };

    return (
        <DashboardSearchPanel>
            <span id="group">
                <span>{groupName}</span>
                <span>{countLabel}</span>
            </span>
            {snippets.map((checkbox, c) => <DashboardSearchCheckbox key={c} checkbox={checkbox} onHandleChecked={onHandleChecked} termsChecked={termsChecked} termsCount={termsCount}/>)}
            <DashboardSearchCheckboxesShowMore moreCount={moreCount} onShowMore={() => onShowMore()}/>
        </DashboardSearchPanel>
    )
}

export default DashboardSearchCheckboxesGroup;
