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

    formatValue(value) {

        if ( value && NumberFormatService.isNumber(value) ) {

            return value.toLocaleString();
        }

        return value;
    }

    cellAlignment(key) {

        return CELLS_RIGHT_ALIGNED.includes(key.toLowerCase());
    };

    redirect = (linkTo) => {

        if ( linkTo ) {

            window.open(linkTo)
        }
    };

    translateHeaderCellNameToDisplayCellName = (cellName) => {

        switch (cellName) {
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
            case "program":
                return "Program";
            case "projectId":
                return "Terra Workspace Name";
            case "publicData":
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

        const Row = (props) => {

            const {children, url} = props;

            return (
                url ? <ClickHandler className={classNames(compStyles.row, compStyles.link)}
                                    clickAction={() => this.redirect(url)}
                                    tag={"tr"}>{children}</ClickHandler> : <tr className={compStyles.row}>{children}</tr>
            )
        };

        const TableRow = (props) => {

            const {order, row} = props,
                url = row["url"];

            return (
                <Row url={url}>
                    {order.map((key, c) =>
                        <td key={c}
                            className={classNames({[compStyles.right]: this.cellAlignment(key)})}>{this.formatValue(row[key])}</td>)}
                </Row>
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
