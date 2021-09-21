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
  const { facetCount, facets } = useContext(ContextDashboard);
  const loading = facets.length === 0;
  const gridX = `x${facetCount}`;
  const classNamesGrid = classNames(
    compStyles.grid,
    { [compStyles.gridLoading]: loading },
    { [compStyles[gridX]]: facetCount }
  );

  return <div className={classNamesGrid}>{children}</div>;
}

export default DashboardGrid;
