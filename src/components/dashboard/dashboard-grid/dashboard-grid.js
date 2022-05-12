/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard grid component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React, { useContext } from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";

// Styles
import * as compStyles from "./dashboard-grid.module.css";

function DashboardGrid(props) {
  const { children } = props;
  const { facets, panelCount } = useContext(ContextDashboard);
  const loading = facets.length === 0;
  const gridX = `x${panelCount}`;
  const classNamesGrid = classNames(
    compStyles.grid,
    { [compStyles.gridLoading]: loading },
    { [compStyles[gridX]]: panelCount }
  );

  return <div className={classNamesGrid}>{children}</div>;
}

export default DashboardGrid;
