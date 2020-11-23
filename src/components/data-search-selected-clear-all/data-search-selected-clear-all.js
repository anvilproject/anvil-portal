/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search clear all component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./data-search-selected-clear-all.module.css";

function DataSearchSelectedClearAll(props) {

    const {onHandleClearSearch} = props;

    return (
        <button className={compStyles.clear} onClick={() => onHandleClearSearch()}>Clear All</button>
    )
}

export default DataSearchSelectedClearAll;
