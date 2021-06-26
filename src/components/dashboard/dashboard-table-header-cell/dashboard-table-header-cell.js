/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table header cell component.
 */

// Core dependencies
import React from "react";

// App dependencies
import * as DashboardTableService from "../../../utils/dashboard/dashboard-table.service";

// Styles
import compStyles from "./dashboard-table-header-cell.module.css";

const classNames = require("classnames");

class DashboardTableHeaderCell extends React.Component {
  render() {
    const { column } = this.props;
    const headerCell = DashboardTableService.switchDisplayColumnName(column);
    const rightAlign = DashboardTableService.cellAlignment(column);
    const identifier = Date.now();
    const id = `${column}${identifier}`;
    const classNamesCell = rightAlign && {
      className: classNames({ [compStyles.right]: rightAlign })
    };

    return (
      <th id={id} {...classNamesCell}>
        {headerCell}
      </th>
    );
  }
}

export default DashboardTableHeaderCell;
