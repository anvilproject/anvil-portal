/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL modal component.
 */

// Core dependencies
import React, {useCallback, useContext, useEffect} from "react";

// App dependencies
import ContextModal from "./context-modal/context-modal";
import ModalSiteSearch from "./modal-site-search/modal-site-search";

// Styles
import compStyles from "./modal.module.css";

function Modal() {

    const {modal, modalAction, onCloseModal} = useContext(ContextModal),
        {showModal, showSiteSearch} = modal;

    const onHandleKeyDown = useCallback((e) => {

        if ( e.key === "Escape" ) {

            onCloseModal(modalAction);
        }
    }, [modalAction, onCloseModal]);

    /* useEffect - componentDidMount, componentWillUnmount. */
    /* Add & remove event listener - "keydown". */
    useEffect(() => {

        document.addEventListener("keydown", onHandleKeyDown, false);

        return() => {

            document.removeEventListener("keydown", onHandleKeyDown, false);
        }
    }, [onHandleKeyDown]);

    return (
        showModal ?
            <>
            <div className={compStyles.modalOverlay} onClick={() => onCloseModal(modalAction)} role={"presentation"}/>
            <div className={compStyles.modalWrapper}>
                {showSiteSearch ? <ModalSiteSearch modalAction={modalAction} onCloseModal={onCloseModal}/> : null}
            </div>
            </> : null
    )
}

export default Modal;
