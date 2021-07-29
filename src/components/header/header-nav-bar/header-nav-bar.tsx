/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header nav bar component.
 */

// Core dependencies
import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";

// App dependencies
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";

// Styles
import compStyles from "./header-nav-bar.module.css";

interface HeaderNavBarProps {
  children: React.ReactElement;
  searchBarOpen: boolean;
}

function HeaderNavBar(props: HeaderNavBarProps): JSX.Element {
  const { children, searchBarOpen } = props;
  const { breakpoint } = useContext(ContextAnVILPortal);
  const { bp720, bp1280 } = breakpoint || {};
  const withinTransitionRange = bp720 && !bp1280;
  const showItems = withinTransitionRange ? !searchBarOpen : true;
  const classNamesTransition = {
    enter: compStyles.searchBarClosed,
    enterActive: compStyles.searchBarClosedActive,
    exit: compStyles.searchBarOpen,
    exitActive: compStyles.searchBarOpenActive,
  };

  return (
    <CSSTransition
      classNames={classNamesTransition}
      in={showItems}
      timeout={{ enter: 600, exit: 600 }}
      unmountOnExit
    >
      <div className={compStyles.headerNavBar}>{children}</div>
    </CSSTransition>
  );
}

export default HeaderNavBar;
