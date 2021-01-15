/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - a React Context object for the modal component.
 */

// Core dependencies
import React from "react";

// App dependencies
import {ModalAction} from "../../../utils/modal/modal-action.model";

const ContextModal = React.createContext({
    modal: {[ModalAction.SHOW_SITE_SEARCH]: false, showModal: false},
    onCloseModal: () => {},
    onOpenModal: () => {}
});

export default ContextModal;
