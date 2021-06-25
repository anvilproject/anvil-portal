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
  const { children, facetCount, inverted, placeholder, row, stretch } = props;
  const panelX = `x${facetCount}`;
  const classNamesPanel = classNames(
    { [compStyles.inverted]: inverted },
    compStyles.panel,
    { [compStyles.placeholder]: placeholder },
    { [compStyles.row]: row },
    { [compStyles.stretch]: stretch },
    { [compStyles[panelX]]: facetCount }
  );

  return <div className={classNamesPanel}>{children}</div>;
}

export default DashboardSearchPanel;
