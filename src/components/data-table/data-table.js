/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table component.
 */

// Core dependencies
import React from "react";

// App dependencies
import * as NumberFormatService from "../../utils/number-format.service";

// Styles
import compStyles from "./data-table.module.css";

let classNames = require("classnames");

let CELLS_RIGHT_ALIGNED = ["cohorts", "demographics", "diagnosis", "families", "files", "samples", "size", "subjects"];

class DataTable extends React.Component {

    formatValue(value) {

        if ( value && NumberFormatService.isNumber(value) ) {

            return value.toLocaleString();
        }

        return value;
    }

    cellAlignment(key) {

        return CELLS_RIGHT_ALIGNED.includes(key.toLowerCase());
    };

    translateHeaderCellNameToDisplayCellName = (cellName) => {

        switch (cellName) {
            case "cohorts":
                return "Cohorts";
            case "demographics":
                return "Demographic";
            case "diagnosis":
                return "Diagnosis";
            case "families":
                return "Family";
            case "files":
                return "Files";
            case "program":
                return "Programs";
            case "projectId":
                return "Project Id";
            case "public":
                return "Public";
            case "samples":
                return "Samples";
            case "subjects":
                return "Subjects";
            case "size":
                return "Size (TB)";
            default:
                return cellName;
        }
    };

    render() {
        const {className, tableHeaders, tableRows} = this.props;

        const TableRow = (props) => {

            const {row} = props;

            return (
                <tr className={compStyles.row}>
                    {Object.entries(row).map(([key, value]) =>
                        <td key={key}
                            className={classNames({[compStyles.right]: this.cellAlignment(key)})}>{this.formatValue(value)}</td>)}
                </tr>
            )
        };

        return (
            <div className={classNames(compStyles.wrapper, className)}>
            <table>
                <thead>
                    <tr className={compStyles.header}>
                        {tableHeaders.map((tableHeader, h) => <th key={h} className={classNames({[compStyles.right]: this.cellAlignment(tableHeader)})}>{this.translateHeaderCellNameToDisplayCellName(tableHeader)}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {tableRows.map((tableRow, r) => <TableRow key={r} row={tableRow}/>)}
                </tbody>
            </table>
            </div>
        );
    }
}

export default (props) => {

    return (
        <DataTable {...props}/>
    )
}
