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

class DashboardSearchPanel extends React.Component {

    render() {
        const {children, stretch} = this.props;
        return (
            <div className={classNames(compStyles.panel, {[compStyles.stretch]: stretch})}>{children}</div>
        )
    };
}

export default DashboardSearchPanel;
