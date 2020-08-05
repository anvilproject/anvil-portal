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
    dashboardIndex: [],
    inputValue: "",
    querying: false,
    results: [],
    resultsExist: true,
    onHandleChecked: () => {},
    onHandleInput: () => {},
    onInitializeCheckboxGroups: () => {}
});

export default DashboardFilterContext;
