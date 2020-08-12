/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table row cell x component.
 * Returns generic data cell for any unspecified workspace property.
 */

// Core dependencies
import React from "react";

// App dependencies
import * as DashboardTableService from "../../utils/dashboard/dashboard-table.service";

// Styles
import compStyles from "./data-table-row-cell-x.module.css";

let classNames = require("classnames");

class DataTableRowCellX extends React.Component {

    render() {
        const {children, column, id} = this.props;
        const rightAlign = DashboardTableService.cellAlignment(column);

        return (
            <td className={classNames({[compStyles.right]: rightAlign})} id={id}>{children}</td>
        );
    }
}

export default DataTableRowCellX;
