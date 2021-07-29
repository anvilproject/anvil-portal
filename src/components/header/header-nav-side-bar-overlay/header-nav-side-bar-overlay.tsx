/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header nav side bar overlay component.
 */

// Core dependencies
import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";

// App dependencies
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";

// Styles
import compStyles from "./header-nav-side-bar-overlay.module.css";

function HeaderNavSideBarOverlay(): JSX.Element {
  const { menuOpen, onSetMenuOpen } = useContext(ContextAnVILPortal);
  const classNamesTransition = {
    enter: compStyles.sideBarOverlayAppear,
    enterActive: compStyles.sideBarOverlayAppearActive,
    exit: compStyles.sideBarOverlayClosed,
    exitActive: compStyles.sideBarOverlayClosedActive,
  };

  return (
    <CSSTransition
      classNames={classNamesTransition}
      in={menuOpen}
      timeout={{ enter: 600, exit: 600 }}
      unmountOnExit
    >
      <div
        className={compStyles.sideBarOverlay}
        onClick={() => onSetMenuOpen(false)}
        role="presentation"
      />
    </CSSTransition>
  );
}

export default HeaderNavSideBarOverlay;
