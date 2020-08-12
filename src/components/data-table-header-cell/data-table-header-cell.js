/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table header cell component.
 */

// Core dependencies
import React from "react";

// App dependencies
import * as DashboardTableService from "../../utils/dashboard/dashboard-table.service";

// Styles
import compStyles from "./data-table-header-cell.module.css";

let classNames = require("classnames");

class DataTableHeaderCell extends React.Component {

    render() {
        const {column} = this.props;
        const headerCell = DashboardTableService.switchDisplayColumnName(column);
        const rightAlign = DashboardTableService.cellAlignment(column);
        const identifier = Date.now();
        const id = `${column}${identifier}`;

        return (
            <th id={id} className={classNames({[compStyles.right]: rightAlign})}>{headerCell}</th>
        );
    }
}

export default DataTableHeaderCell;
