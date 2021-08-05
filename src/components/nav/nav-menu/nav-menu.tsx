/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav menu component.
 */

// Core dependencies
import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";

// App dependencies
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";

// Styles
import compStyles from "./nav-menu.module.css";

interface NavMenuProps {
  children: React.ReactElement[];
}

function NavMenu(props: NavMenuProps) {
  const { children } = props;
  const { navMenuOpen } = useContext(ContextAnVILPortal);
  const classNamesTransition = {
    enter: compStyles.navMenuAppear,
    enterActive: compStyles.navMenuAppearActive,
    exit: compStyles.navMenuClosed,
    exitActive: compStyles.navMenuClosedActive,
  };

  return (
    <CSSTransition
      classNames={classNamesTransition}
      in={navMenuOpen}
      timeout={{ enter: 300, exit: 300 }}
      unmountOnExit
    >
      <div className={compStyles.navMenu}>{children}</div>
    </CSSTransition>
  );
}

export default NavMenu;
