/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - a React Context object for app level functionality.
 */

// Core dependencies
import React from "react";

// App dependencies
import { IBreakpoint } from "../breakpoint/IBreakpoint";

interface AnVILPortalContext {
  breakpoint: IBreakpoint;
  menuOpen: boolean;
  siteScrollable: boolean;
  onSetMenuOpen(expanded: boolean): void;
  onSetSiteScrollable(scrollable: boolean): void;
}

const ContextAnVILPortal = React.createContext<AnVILPortalContext>({
  breakpoint: { bp720: false, bp1280: false },
  menuOpen: false,
  siteScrollable: true,
  onSetMenuOpen() {},
  onSetSiteScrollable() {},
});

export default ContextAnVILPortal;
