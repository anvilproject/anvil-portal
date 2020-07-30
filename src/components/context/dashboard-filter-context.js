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
    checkboxes: [],
    dashboardIndex: [],
    inputValue: "",
    results: [],
    resultsExist: true,
    onChange: () => {},
    onHandleChecked: () => {},
    onInitializeCheckboxes: () => {}
});

export default DashboardFilterContext;
