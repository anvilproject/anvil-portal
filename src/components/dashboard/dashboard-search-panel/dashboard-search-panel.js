/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search panel component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./dashboard-search-panel.module.css";

const classNames = require("classnames");

function DashboardSearchPanel(props) {

    const {children, stretch} = props;

    return (
            <div className={classNames(compStyles.panel, {[compStyles.stretch]: stretch})}>{children}</div>
        )
}

export default DashboardSearchPanel;
