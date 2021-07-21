/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL modal component.
 */

// Core dependencies
import React, { useCallback, useContext, useEffect } from "react";
import ReactDOM from "react-dom";

// App dependencies
import ContextModal from "./context-modal/context-modal";

// Styles
import compStyles from "./modal.module.css";
const classNames = require("classnames");

function Modal(props) {
  const { children, onClose } = props;
  const { modal } = useContext(ContextModal);
  const { showDrawer, showModal } = modal;
  const modalEl = document.getElementById("modal-root");
  const portalEl = (
    <>
      <div
        className={classNames(compStyles.modalOverlay, {
          [compStyles.show]: showDrawer
        })}
        onClick={() => onClose()}
        role={"presentation"}
      />
      <div className={compStyles.modalWrapper}>{children}</div>
    </>
  );

  const onHandleKeyDown = useCallback(
    e => {
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

  return showModal ? ReactDOM.createPortal(portalEl, modalEl) : null;
}

export default Modal;
