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
import Modal from "../modal";
import ModalClose from "../modal-close/modal-close";

// Styles
import compStyles from "./modal-dashboard-checkbox-selector.module.css";
import globalStyles from "../../../styles/global.module.css";

const classNames = require("classnames");

function ModalDashboardCheckboxSelector(props) {

    const {children, groupName} = props;
    const {modal, onCloseModal} = useContext(ContextModal),
        {modalGroup, showModal} = modal;
    const showGroup = showModal && groupName === modalGroup;

    return (
        showGroup ?
            <Modal>
                <div className={classNames(globalStyles.container, compStyles.selector)}>
                    <ModalClose onCloseModal={onCloseModal}/>
                    <h1>{groupName}</h1>
                    <div className={compStyles.panel}>
                        {children}
                    </div>
                </div>
            </Modal> : null
    )
}

export default ModalDashboardCheckboxSelector;
