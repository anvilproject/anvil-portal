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
import ContextModal from "../../modal/context-modal/context-modal";
import ModalDashboardSearchCheckboxesGroup from "../../modal/modal-dashboard-search-checkboxes-group/modal-dashboard-search-checkboxes-group";

function DashboardSearchCheckboxes() {

    const {checkboxGroups, countLabel} = useContext(ContextDashboard);
    const {modal} = useContext(ContextModal);
    const {showModal} = modal;
    const facetCount = checkboxGroups.length;

    return (
        <>
        {checkboxGroups.map((checkboxGroup, c) =>
            <DashboardSearchCheckboxesGroup key={c}
                                            checkboxes={checkboxGroup.checkboxes}
                                            countLabel={countLabel}
                                            facetCount={facetCount}
                                            groupName={checkboxGroup.groupName}/>)}
        {showModal ? <ModalDashboardSearchCheckboxesGroup/> : null}
        </>
        )
}

export default DashboardSearchCheckboxes;
