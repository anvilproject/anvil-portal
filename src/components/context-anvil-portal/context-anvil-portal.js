/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - a React Context object for app level functionality.
 */

// Core dependencies
import React from "react";

const ContextAnVILPortal = React.createContext({
    breakpoints: {bp720: false, bp1280: false},
    menuOpen: false,
    siteScrollable: true,
    onSetMenuOpen: () => {},
});

export default ContextAnVILPortal;
