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
import ClickHandler from "../clickHandler/clickHandler";

// Styles
import compStyles from "./data-table.module.css";

let classNames = require("classnames");

let CELLS_RIGHT_ALIGNED = ["cohorts", "demographics", "diagnosis", "families", "files", "samples", "size", "subjects"];

class DataTable extends React.Component {

    formatValue(value, column) {

        if ( value && column === "size" ) {

            return NumberFormatService.formatSizeToTB(value);
        }

        if ( value && NumberFormatService.isNumber(value) ) {

            return value.toLocaleString();
        }

        return value;
    }

    cellAlignment(key) {

        return CELLS_RIGHT_ALIGNED.includes(key.toLowerCase());
    };

    redirect = (column, linkId) => {

        if ( linkId ) {

            if ( column === "projectId" ) {

                window.open(`https://anvil.terra.bio/#workspaces/anvil-datastorage/${linkId}`)
            }
            else if ( column === "dbGapId" ) {

                window.open(`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${linkId}`)
            }
        }
    };

    translateHeaderCellNameToDisplayCellName = (cellName) => {

        switch (cellName) {
            case "access":
                return "Access";
            case "cohorts":
                return "Cohorts";
            case "demographics":
                return "Subjects";
            case "diagnosis":
                return "Diagnosis";
            case "families":
                return "Family";
            case "files":
                return "Files";
            case "dbGapId":
                return "dbGap Id";
            case "program":
                return "Program";
            case "projectId":
                return "Terra Workspace Name";
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

        const RowCell = (props) => {

            const {children, className, column} = props,
            linked = (column === "projectId" || column === "dbGapId") && children,
            data = this.formatValue(children, column) || "--";

            return (
                linked ? <ClickHandler className={classNames(className, compStyles.link)}
                                    clickAction={() => this.redirect(column, data)}
                                    tag={"td"}>{children}</ClickHandler> : <td className={className}>{data}</td>
            )
        };

        const TableRow = (props) => {

            const {order, row} = props;
            const totalRow = row.program === "Total";

            return (
                <tr className={classNames(compStyles.row, {[compStyles.total]: totalRow})}>
                    {order.map((key, c) =>
                        <RowCell key={c}
                              column={key}
                              className={classNames({[compStyles.right]: this.cellAlignment(key)})}>{row[key]}</RowCell>)}
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
                    {tableRows.map((tableRow, r) => <TableRow key={r} order={tableHeaders} row={tableRow}/>)}
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
