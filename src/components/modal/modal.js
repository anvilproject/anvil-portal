/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL modal component.
 */

// Core dependencies
import React, { useCallback, useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

// App dependencies
import ContextModal from "./context-modal/context-modal";

// Styles
import compStyles from "./modal.module.css";
const classNames = require("classnames");

function Modal(props) {
  const { children, onClose } = props;
  const { modal } = useContext(ContextModal);
  const modalElRef = useRef(null);
  const { showDrawer, showModal } = modal;
  const portalEl = (
    <>
      <div
        className={classNames(compStyles.modalOverlay, {
          [compStyles.show]: showDrawer,
        })}
        onClick={() => onClose()}
        role={"presentation"}
      />
      <div className={compStyles.modalWrapper}>{children}</div>
    </>
  );

  const onHandleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  /* useEffect - componentDidMount, componentWillUnmount. */
  /* Add & remove event listener - "keydown". */
  useEffect(() => {
    document.addEventListener("keydown", onHandleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", onHandleKeyDown, false);
    };
  }, [onHandleKeyDown]);

  /* useEffect - componentDidMount. */
  useEffect(() => {
    modalElRef.current = document.getElementById("modal-root");
  }, []);

  return showModal ? ReactDOM.createPortal(portalEl, modalElRef.current) : null;
}

export default Modal;
