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
  const { children, inverted, placeholder, row, spanGrid } = props;
  const classNamesPanel = classNames(
    { [compStyles.inverted]: inverted },
    compStyles.panel,
    { [compStyles.placeholder]: placeholder },
    { [compStyles.row]: row },
    { [compStyles.spanGrid]: spanGrid }
  );

  return <div className={classNamesPanel}>{children}</div>;
}

export default DashboardSearchPanel;
