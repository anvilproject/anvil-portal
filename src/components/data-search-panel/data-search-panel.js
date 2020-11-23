/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search panel component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./data-search-panel.module.css";

let classNames = require("classnames");

class DataSearchPanel extends React.Component {

    render() {
        const {children, stretch} = this.props;
        return (
            <div className={classNames(compStyles.panel, {[compStyles.stretch]: stretch})}>{children}</div>
        )
    };
}

export default DataSearchPanel;
