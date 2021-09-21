/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav drawer component.
 */

// Core dependencies
import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";

// App dependencies
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";
import NavDrawerOverlay from "../nav-drawer-overlay/nav-drawer-overlay";

// Styles
import * as compStyles from "./nav-drawer.module.css";

interface NavDrawerProps {
  children: React.ReactElement[];
}

function NavDrawer(props: NavDrawerProps): JSX.Element {
  const { children } = props;
  const { navDrawerOpen } = useContext(ContextAnVILPortal);
  const classNamesTransition = {
    enter: compStyles.navDrawerAppear,
    enterActive: compStyles.navDrawerAppearActive,
    exit: compStyles.navDrawerClosed,
    exitActive: compStyles.navDrawerClosedActive,
  };

  return (
    <>
      <NavDrawerOverlay />
      <CSSTransition
        classNames={classNamesTransition}
        in={navDrawerOpen}
        timeout={{ enter: 600, exit: 600 }}
        unmountOnExit
      >
        <div className={compStyles.navDrawer}>{children}</div>
      </CSSTransition>
    </>
  );
}

export default NavDrawer;
