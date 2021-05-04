/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table row component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardTableRowCell from "../dashboard-table-row-cell/dashboard-table-row-cell";

// Styles
import compStyles from "./dashboard-table-row.module.css";

class DashboardTableRow extends React.Component {

    render() {
        const {dataset, order, row} = this.props;

        return (
            <tr className={compStyles.row}>
                {order.map((key, c) =>
                    <DashboardTableRowCell
                        key={c}
                        dataset={dataset}
                        column={key}>{row[key]}</DashboardTableRowCell>)}
            </tr>
        );
    }
}

export default DashboardTableRow;
