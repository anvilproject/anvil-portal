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

    const {children, inverted, row, stretch} = props;
    const classNamesPanel = classNames(
        compStyles.panel,
        {[compStyles.inverted]: inverted},
        {[compStyles.row]: row},
        {[compStyles.stretch]: stretch});

    return (
            <div className={classNamesPanel}>{children}</div>
        )
}

export default DashboardSearchPanel;
