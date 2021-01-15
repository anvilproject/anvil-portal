/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL modal provider component.
 */

// Core dependencies
import React, {useState} from "react";

// App dependencies
import ContextModal from "../context-modal/context-modal";
import {ModalAction} from "../../../utils/modal/modal-action.model";

function ProviderModal(props) {

    const {children} = props;
    const [modal, setModal] = useState({
        [ModalAction.SHOW_SITE_SEARCH]: false,
        showModal: false
    });

    const onCloseModal = (modalAction) => {

        /* Set state. */
        setModal(modal => ({...modal, showModal: false, [modalAction]: false}));
    };

    const onOpenModal = (modalAction) => {

        /* Set state. */
        setModal(modal => ({...modal, showModal: true, [modalAction]: true}));
    };

    return (
        <ContextModal.Provider value={{modal, onCloseModal, onOpenModal}}>
            {children}
        </ContextModal.Provider>
    )
}

export default ProviderModal;
