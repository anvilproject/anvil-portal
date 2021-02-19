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

// Styles
import compStyles from "./modal.module.css";

function Modal(props) {

    const {children, group} = props;
    const {modal, onCloseModal} = useContext(ContextModal),
        {modalGroup, showModal} = modal;
    const showGroup = group === modalGroup;

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
        showModal && showGroup ?
            <div>
                <div className={compStyles.modalOverlay} onClick={() => onCloseModal()} role={"presentation"}/>
                <div className={compStyles.modalWrapper}>{children}</div>
            </div> : null
    )
}

export default Modal;
