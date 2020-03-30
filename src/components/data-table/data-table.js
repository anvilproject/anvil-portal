/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table component.
 */

// Core dependencies
import React from "react";

// App dependencies
import * as DashboardTableService from "../../utils/dashboard-table.service";
import ClickHandler from "../clickHandler/clickHandler";

// Styles
import compStyles from "./data-table.module.css";

let classNames = require("classnames");

class DataTable extends React.Component {

    redirect = (linkTo) => {

        window.open(linkTo)
    };

    render() {
        const {className, tableHeaders, tableRows} = this.props,
            summaryTable = className === compStyles.summary;

        const HeaderCell = (props) => {

            const {column} = props,
                headerCell = DashboardTableService.switchDisplayColumnName(column),
                rightAlign = DashboardTableService.cellAlignment(column);

            return (
                <th className={classNames({[compStyles.right]: rightAlign})}>{headerCell}</th>
            )
        };

        const RowCell = (props) => {

            const {children, column, summary} = props,
                data = DashboardTableService.formatValue(children, column),
                linkedTo = DashboardTableService.getCellUrl(children, column, summary),
                rightAlign = DashboardTableService.cellAlignment(column);

            return (
                linkedTo ? <ClickHandler className={classNames({[compStyles.right]: rightAlign}, compStyles.link)}
                                         clickAction={() => this.redirect(linkedTo)}
                                         tag={"td"}>{data}</ClickHandler> :
                    <td className={classNames({[compStyles.right]: rightAlign})}>{data}</td>
            )
        };

        const TableRow = (props) => {

            const {order, row, summary} = props,
                totalRow = row.program === "Total";

            return (
                <tr className={classNames(compStyles.row, {[compStyles.total]: totalRow})}>
                    {order.map((key, c) =>
                        <RowCell key={c}
                                 column={key}
                                 summary={summary}>{row[key]}</RowCell>)}
                </tr>
            )
        };

        return (
            <div className={classNames(compStyles.wrapper, className)}>
                <table>
                    <thead>
                    <tr className={compStyles.header}>
                        {tableHeaders.map((tableHeader, h) => <HeaderCell key={h} column={tableHeader}/>)}
                    </tr>
                    </thead>
                    <tbody>
                    {tableRows.map((tableRow, r) => <TableRow key={r}
                                                              order={tableHeaders}
                                                              row={tableRow}
                                                              summary={summaryTable}/>)}
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
