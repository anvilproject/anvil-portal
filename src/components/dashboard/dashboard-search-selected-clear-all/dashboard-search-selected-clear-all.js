/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search clear all component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./dashboard-search-selected-clear-all.module.css";

function DashboardSearchSelectedClearAll(props) {

    const {onHandleClearSearch} = props;

    return (
        <button className={compStyles.clear} onClick={() => onHandleClearSearch()}>Clear All</button>
    )
}

export default DashboardSearchSelectedClearAll;
