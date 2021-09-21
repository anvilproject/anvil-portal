/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL modal drawer component.
 */

// Core dependencies
import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";

// App dependencies
import ContextModal from "../context-modal/context-modal";

// Styles
import * as compStyles from "./modal-drawer.module.css";

function ModalDrawer(props) {
  const { children } = props;
  const { modal, onCloseModal } = useContext(ContextModal);
  const { showDrawer } = modal;
  const classNamesTransition = {
    appear: compStyles.drawerAppear,
    appearActive: compStyles.drawerAppearActive,
    exit: compStyles.drawerClosed,
    exitActive: compStyles.drawerClosedActive,
    exitDone: compStyles.drawerExitDone,
  };

  return (
    <CSSTransition
      appear
      classNames={classNamesTransition}
      in={showDrawer}
      mountOnEnter={true}
      onExited={() => onCloseModal()}
      timeout={250}
      unmountOnExit={true}
    >
      <div className={compStyles.drawer}>{children}</div>
    </CSSTransition>
  );
}

export default ModalDrawer;
