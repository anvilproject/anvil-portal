/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header nav side bar component.
 */

// Core dependencies
import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";

// App dependencies
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";
import HeaderNavSideBarOverlay from "../header-nav-side-bar-overlay/header-nav-side-bar-overlay";

// Styles
import * as compStyles from "./header-nav-side-bar.module.css";

interface HeaderNavSideBarProps {
  children: React.ReactElement[];
}

function HeaderNavSideBar(props: HeaderNavSideBarProps): JSX.Element {
  const { children } = props;
  const { menuOpen } = useContext(ContextAnVILPortal);
  const classNamesTransition = {
    enter: compStyles.sideBarAppear,
    enterActive: compStyles.sideBarAppearActive,
    exit: compStyles.sideBarClosed,
    exitActive: compStyles.sideBarClosedActive,
  };

  return (
    <>
      <HeaderNavSideBarOverlay />
      <CSSTransition
        classNames={classNamesTransition}
        in={menuOpen}
        timeout={{ enter: 600, exit: 600 }}
        unmountOnExit
      >
        <div className={compStyles.headerNavSideBar}>{children}</div>
      </CSSTransition>
    </>
  );
}

export default HeaderNavSideBar;
