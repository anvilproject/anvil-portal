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
import compStyles from "./modal-drawer.module.css";

function ModalDrawer(props) {
  const { children } = props;
  const { modal } = useContext(ContextModal);
  const { showDrawer } = modal;
  const classNamesTransition = {
    appear: compStyles.drawerAppear,
    appearActive: compStyles.drawerAppearActive,
    exit: compStyles.drawerClosed,
    exitActive: compStyles.drawerClosedActive
  };

  return (
    <CSSTransition
      appear
      classNames={classNamesTransition}
      in={showDrawer}
      mountOnEnter
      timeout={250}
      unmountOnExit
    >
      <div className={compStyles.drawer}>{children}</div>
    </CSSTransition>
  );
}

export default ModalDrawer;
