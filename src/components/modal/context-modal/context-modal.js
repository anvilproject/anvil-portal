/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - a React Context object for the modal component.
 */

// Core dependencies
import React from "react";

const ContextModal = React.createContext({
    modal: {modalProps: {}, showModal: false},
    onCloseModal: () => {},
    onOpenModal: () => {}
});

export default ContextModal;
