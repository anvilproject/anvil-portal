/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL modal component.
 */

// Core dependencies
import React, {useCallback, useContext, useEffect} from "react";
import ReactDOM from "react-dom";

// App dependencies
import ContextModal from "./context-modal/context-modal";

// Styles
import compStyles from "./modal.module.css";

function Modal() {

    const {modal, onCloseModal} = useContext(ContextModal),
        {modalComponent: ModalComponent, showModal} = modal || {};
    const PortalComponent =
        <>
        <div className={compStyles.modalOverlay} onClick={() => onCloseModal()} role={"presentation"}/>
        <div className={compStyles.modalWrapper}>{ModalComponent}</div>
        </>;

    const onHandleKeyDown = useCallback((e) => {

        if ( e.key === "Escape" ) {

            onCloseModal();
        }
    }, [onCloseModal]);

    /* useEffect - componentDidMount, componentWillUnmount. */
    /* Add & remove event listener - "keydown". */
    useEffect(() => {

        document.addEventListener("keydown", onHandleKeyDown, false);

        return() => {

            document.removeEventListener("keydown", onHandleKeyDown, false);
        }
    }, [onHandleKeyDown]);

    return (
        showModal ? ReactDOM.createPortal(PortalComponent, document.getElementById("portal-modal")) : <></>
    )
}

export default Modal;
