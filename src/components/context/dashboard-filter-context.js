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
    searchURL: "",
    setOfCountResultsByFacet: new Map(),
    setOfResults: new Set(),
    setOfResultsBySearchGroups: new Map(),
    summaries: [],
    tableHeadersEntities: [],
    tableHeadersSummary: [],
    termsChecked: new Map(),
    termsCount: new Map(),
    workspaces: [],
    onHandleChecked: () => {},
    onHandleClearInput: () => {},
    onHandleInput: () => {},
});

export default DashboardFilterContext;
