/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL modal provider component.
 */

// Core dependencies
import React, {useCallback, useContext, useState} from "react";

// App dependencies
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";
import ContextModal from "../context-modal/context-modal";
import Modal from "../modal";

function ProviderModal(props) {

    const {children} = props;
    const {onSetSiteScrollable} = useContext(ContextAnVILPortal);
    const [modal, setModal] = useState({modalComponent: null, showModal: false});

    const onCloseModal = useCallback(() => {

        /* Set state. */
        setModal(modal => ({...modal, modalComponent: null, showModal: false}));
        onSetSiteScrollable(true);
    }, [onSetSiteScrollable]);

    const onOpenModal = useCallback((mComponent) => {

        /* Set state. */
        setModal(modal => ({...modal, modalComponent: mComponent, showModal: true}));
        onSetSiteScrollable(false);
    }, [onSetSiteScrollable]);

    return (
        <ContextModal.Provider value={{modal, onCloseModal, onOpenModal}}>
            {children}
            <Modal/>
        </ContextModal.Provider>
    )
}

export default ProviderModal;
