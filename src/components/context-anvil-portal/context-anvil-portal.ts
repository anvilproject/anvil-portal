/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - a React Context object for app level functionality.
 */

// Core dependencies
import React from "react";

interface AnVILPortalContextProps {
  navDrawerOpen: boolean;
  showNavDrawerButton: boolean;
  siteScrollable: boolean;

  onSetNavDrawerOpen(expanded: boolean): void;

  onSetShowNavDrawerButton(show: boolean): void;

  onSetSiteScrollable(scrollable: boolean): void;
}

const ContextAnVILPortal = React.createContext<AnVILPortalContextProps>({
  navDrawerOpen: false,
  showNavDrawerButton: false,
  siteScrollable: true,
  onSetNavDrawerOpen() {},
  onSetShowNavDrawerButton() {},
  onSetSiteScrollable() {},
});

export default ContextAnVILPortal;
