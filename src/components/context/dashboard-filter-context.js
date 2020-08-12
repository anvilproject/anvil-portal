/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - a React Context object for sharing dashboard search query results.
 * Used to filter the dashboard dataset.
 */

// Core dependencies
import React from "react";

const DashboardFilterContext = React.createContext({
    checkboxGroups: [],
    inputValue: "",
    querying: false,
    setOfCountResultsByFacet: new Map(),
    setOfResults: new Set(),
    setOfResultsByFacet: new Map(),
    summaries: [],
    termsChecked: new Map(),
    termsCount: new Map(),
    workspaces: [],
    onHandleChecked: () => {},
    onHandleInput: () => {},
});

export default DashboardFilterContext;
