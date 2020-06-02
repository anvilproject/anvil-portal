/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ClickHandler from "../click-handler/click-handler";
import Tooltip from "../tooltip/tooltip";
import * as DashboardTableService from "../../utils/dashboard/dashboard-table.service";
import * as RedirectService from "../../utils/redirect.service";

// Styles
import compStyles from "./data-table.module.css";

let classNames = require("classnames");

class DataTable extends React.Component {

    render() {
        const {className, tableHeaders, tableRows} = this.props,
            summaryTable = className === compStyles.summary;

        const Cell = (props) => {

            const {children} = (props),
                label = DashboardTableService.findCellTooltip(children);

            if ( label ) {

                return (<Tooltip label={label}>{children}</Tooltip>);
            }

            return children;
        };

        const HeaderCell = (props) => {

            const {column} = props,
                headerCell = DashboardTableService.switchDisplayColumnName(column),
                rightAlign = DashboardTableService.cellAlignment(column);
            const identifier = Date.now(),
                id = `${column}${identifier}`;

            return (
                <th id={id} className={classNames({[compStyles.right]: rightAlign})}>{headerCell}</th>
            )
        };

        const RowCell = (props) => {

            const {children, column, summary} = props,
                data = DashboardTableService.formatValue(children, column),
                linkedTo = DashboardTableService.getCellUrl(children, column, summary),
                rightAlign = DashboardTableService.cellAlignment(column);
            const identifier = Date.now(),
                id = `${column}${identifier}`;

            return (
                linkedTo ? <ClickHandler className={classNames({[compStyles.right]: rightAlign}, compStyles.link)}
                                         clickAction={() => RedirectService.redirect(linkedTo, data)}
                                         id={id}
                                         tag={"td"}
                                         label={data}>{data}</ClickHandler> :
                    <td id={id} className={classNames({[compStyles.right]: rightAlign})}><Cell>{data}</Cell></td>
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
                        {tableRows.map((tableRow, r) =>
                            <TableRow key={r}
                                      order={tableHeaders}
                                      row={tableRow}
                                      summary={summaryTable}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DataTable;
