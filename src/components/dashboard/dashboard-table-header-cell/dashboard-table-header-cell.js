/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table header cell component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// App dependencies
import { DashboardEntityPropertyNameDisplay } from "../../../utils/dashboard/dashboard-entity-property-name-display.model";
import { DashboardSummaryPropertyNameDisplay } from "../../../utils/dashboard/dashboard-summary-property-name-display.model";
import * as DashboardTableService from "../../../utils/dashboard/dashboard-table.service";

// Styles
import * as compStyles from "./dashboard-table-header-cell.module.css";

function DashboardTableHeaderCell(props) {
  const { column, dataset } = props;
  const datasetSummary = dataset === "summary";
  const headerCell =
    (datasetSummary
      ? DashboardSummaryPropertyNameDisplay[column]
      : DashboardEntityPropertyNameDisplay[column]) || column;
  const rightAlign = DashboardTableService.cellAlignment(column);
  const identifier = Date.now();
  const id = `${column}${identifier}`;
  const classNamesCell = rightAlign && {
    className: classNames({ [compStyles.right]: rightAlign }),
  };

  return (
    <th id={id} {...classNamesCell}>
      {headerCell}
    </th>
  );
}

export default DashboardTableHeaderCell;
