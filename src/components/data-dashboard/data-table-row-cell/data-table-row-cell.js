/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table row cell component.
 */

// Core dependencies
import React from "react";

// App dependencies
import * as DashboardTableService from "../../../utils/dashboard/dashboard-table.service";

// Styles
import "./data-table-row-cell.module.css";

class DataTableRowCell extends React.Component {

    render() {
        const {children, column, summary} = this.props;
        const identifier = Date.now();
        const id = `${column}${identifier}`;
        const reactElementType = DashboardTableService.getReactElementType(column, summary);
        const cellData = DashboardTableService.formatValue(children, column);
        const rowCell = React.createElement(reactElementType, {...this.props, id}, cellData);

        return (
            rowCell
        );
    }
}

export default DataTableRowCell;
