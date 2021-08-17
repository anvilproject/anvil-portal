/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - a React Context object for app level functionality.
 */

// Core dependencies
import React from "react";

interface AnVILPortalContextProps {
  menuOpen: boolean;
  navDrawerOpen: boolean;
  showNavDrawerButton: boolean;
  siteScrollable: boolean;
  onSetMenuOpen(expanded: boolean): void;
  onSetNavDrawerOpen(expanded: boolean): void;
  onSetShowNavDrawerButton(show: boolean): void;
  onSetSiteScrollable(scrollable: boolean): void;
}

const ContextAnVILPortal = React.createContext<AnVILPortalContextProps>({
  menuOpen: false,
  navDrawerOpen: false,
  showNavDrawerButton: false,
  siteScrollable: true,
  onSetMenuOpen() {},
  onSetNavDrawerOpen() {},
  onSetShowNavDrawerButton() {},
  onSetSiteScrollable() {},
});

export default ContextAnVILPortal;
