/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table row component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataTableRowCell from "../data-table-row-cell/data-table-row-cell";

// Styles
import compStyles from "./data-table-row.module.css";

class DataTableRow extends React.Component {

    render() {
        const {order, row, summary} = this.props;

        return (
            <tr className={compStyles.row}>
                {order.map((key, c) =>
                    <DataTableRowCell
                        key={c}
                        column={key}
                        summary={summary}>{row[key]}</DataTableRowCell>)}
            </tr>
        );
    }
}

export default DataTableRow;
