/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table row cell component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import Tooltip from "../../tooltip/tooltip";
import * as DashboardTableService from "../../../utils/dashboard/dashboard-table.service";

// Styles
import "./dashboard-table-row-cell.module.css";

function DashboardTableRowCell(props) {
  const { children, column, dataset } = props;
  const { warning } = useContext(ContextDashboard);
  const identifier = Date.now();
  const id = `${column}${identifier}`;
  const reactElementType = DashboardTableService.getReactElementType(
    column,
    dataset
  );
  const showWarning = children === "Totals" && warning;
  let cellData = DashboardTableService.formatValue(children, column);
  /* Summary total row - cell "Totals". */
  if (showWarning) {
    cellData = (
      <Tooltip label={warning}>
        Totals <sup>*</sup>
      </Tooltip>
    );
  }
  return React.createElement(reactElementType, { ...props, id }, cellData);
}

export default DashboardTableRowCell;
