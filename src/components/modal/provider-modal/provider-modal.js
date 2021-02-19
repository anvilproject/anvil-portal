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

function ProviderModal(props) {

    const {children} = props;
    const {onSetSiteScrollable} = useContext(ContextAnVILPortal);
    const [modal, setModal] = useState({modalGroup: null, showModal: false});

    const onCloseModal = useCallback(() => {

        /* Set state. */
        setModal({modalGroup: null, showModal: false});
        onSetSiteScrollable(true);
    }, [onSetSiteScrollable]);

    const onOpenModal = useCallback((mGroup) => {

        /* Set state. */
        setModal({modalGroup: mGroup, showModal: true});
        onSetSiteScrollable(false);
    }, [onSetSiteScrollable]);

    return (
        <ContextModal.Provider value={{modal, onCloseModal, onOpenModal}}>
            {children}
        </ContextModal.Provider>
    )
}

export default ProviderModal;
