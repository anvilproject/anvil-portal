/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav drawer overlay component.
 */

// Core dependencies
import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";

// App dependencies
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";

// Styles
import compStyles from "./nav-drawer-overlay.module.css";

function NavDrawerOverlay(): JSX.Element {
  const { navDrawerOpen, onSetNavDrawerOpen } = useContext(ContextAnVILPortal);
  const classNamesTransition = {
    enter: compStyles.navDrawerOverlayAppear,
    enterActive: compStyles.navDrawerOverlayAppearActive,
    exit: compStyles.navDrawerOverlayClosed,
    exitActive: compStyles.navDrawerOverlayClosedActive,
  };

  return (
    <CSSTransition
      classNames={classNamesTransition}
      in={navDrawerOpen}
      timeout={{ enter: 600, exit: 600 }}
      unmountOnExit
    >
      <div
        className={compStyles.navDrawerOverlay}
        onClick={() => onSetNavDrawerOpen(false)}
        role="presentation"
      />
    </CSSTransition>
  );
}

export default NavDrawerOverlay;
