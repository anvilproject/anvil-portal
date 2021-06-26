/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header nav items component.
 */

// Core dependencies
import React from "react";
import { CSSTransition } from "react-transition-group";

// App dependencies
import HeaderNavItem from "../header-nav-item/header-nav-item";
import * as HeaderService from "../../../utils/header.service";

// Styles
import compStyles from "./header-nav-items.module.css";

const classNames = require("classnames");

const HeaderNavItems = props => {
  const { breakpoints, menuOpen, ncpi, searchBarOpen } = props,
    { bp720, bp1280 } = breakpoints || {};
  const withinTransitionRange = bp720 && !bp1280;
  const classNamesHeaderNavItems = classNames(compStyles.headerNavItems, {
    [compStyles.menuOpen]: menuOpen
  });
  const headers = HeaderService.getHeaderLinks(ncpi);
  const showItems = withinTransitionRange ? !searchBarOpen : true;
  const showPartiallyActive = !ncpi;
  const classNamesTransition = {
    enter: compStyles.searchBarClosed,
    enterActive: compStyles.searchBarClosedActive,
    exit: compStyles.searchBarOpen,
    exitActive: compStyles.searchBarOpenActive
  };

  return (
    <CSSTransition
      classNames={classNamesTransition}
      in={showItems}
      timeout={{ enter: 600, exit: 600 }}
      unmountOnExit
    >
      <ul className={classNamesHeaderNavItems}>
        {headers.map((header, h) => (
          <HeaderNavItem
            key={h}
            header={header}
            partiallyActive={showPartiallyActive}
          />
        ))}
      </ul>
    </CSSTransition>
  );
};

export default React.memo(HeaderNavItems);
