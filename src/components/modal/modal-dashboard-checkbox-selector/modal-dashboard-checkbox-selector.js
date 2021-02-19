/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL modal dashboard checkbox selector component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextModal from "../context-modal/context-modal";
import DashboardSearchCheckbox from "../../dashboard/dashboard-search-checkbox/dashboard-search-checkbox";
import ModalClose from "../modal-close/modal-close";

// Styles
import compStyles from "./modal-dashboard-checkbox-selector.module.css";
import globalStyles from "../../../styles/global.module.css";

const classNames = require("classnames");

function ModalDashboardCheckboxSelector(props) {

    const {checkboxes, groupName, onHandleChecked, termsChecked, termsCount} = props;
    const {onCloseModal} = useContext(ContextModal);

    return (
        <div className={classNames(globalStyles.container, compStyles.selector)}>
            <ModalClose onCloseModal={onCloseModal}/>
            <h1>{groupName}</h1>
            <div className={compStyles.panel}>
                {checkboxes.map((checkbox, c) =>
                    <DashboardSearchCheckbox key={c}
                                             checkbox={checkbox}
                                             onHandleChecked={onHandleChecked}
                                             termsChecked={termsChecked}
                                             termsCount={termsCount}/>)}
            </div>
        </div>
    )
}

export default ModalDashboardCheckboxSelector;
