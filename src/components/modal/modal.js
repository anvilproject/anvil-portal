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

function Modal(props) {

    const {children} = props;
    const {onCloseModal} = useContext(ContextModal);
    const modalEl = document.getElementById("modal-root");
    const portalEl =
        <>
        <div className={compStyles.modalOverlay} onClick={() => onCloseModal()} role={"presentation"}/>
        <div className={compStyles.modalWrapper}>{children}</div>
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
        ReactDOM.createPortal(portalEl, modalEl)
    )
}

export default Modal;
