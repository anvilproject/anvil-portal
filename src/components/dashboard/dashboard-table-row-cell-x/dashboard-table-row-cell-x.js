/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table row cell x component.
 * Returns generic data cell for any unspecified property.
 */

// Core dependencies
import React from "react";

// App dependencies
import * as DashboardTableService from "../../../utils/dashboard/dashboard-table.service";

// Styles
import compStyles from "./dashboard-table-row-cell-x.module.css";

const classNames = require("classnames");

class DashboardTableRowCellX extends React.Component {

    render() {
        const {children, column, id} = this.props;
        const rightAlign = DashboardTableService.cellAlignment(column);
        const classNamesCell = rightAlign && {className: classNames({[compStyles.right]: rightAlign})};

        return (
            <td {...classNamesCell} id={id}>{children}</td>
        )
    }
}

export default DashboardTableRowCellX;
