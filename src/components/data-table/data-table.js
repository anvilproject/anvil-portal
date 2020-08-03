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
        const {className, detail, inset, singleRow, tableHeaders, tableRow, tableRows, workspaces} = this.props,
            summaryTable = className === compStyles.summary;

        const Cell = (props) => {

            const {children} = props;
            const label = DashboardTableService.findCellTooltip(children);
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

            const {children, column, summary} = props;
            const data = DashboardTableService.formatValue(children, column);
            const linkedTo = DashboardTableService.getCellUrl(children, column, summary);
            const rightAlign = DashboardTableService.cellAlignment(column);
            const identifier = Date.now();
            const id = `${column}${identifier}`;
            
            /* Add tooltip to workspace names, truncate long diseases values. */
            let linkedToContent;
            if ( !!linkedTo && column === "projectId" ) {

                linkedToContent = (<Tooltip label={data}>{data}</Tooltip>);
            }
            else if ( column === "diseases" && data.length > 50 ) {
                const truncated = `${data.substring(0, 47)}...`;
                linkedToContent = (<Tooltip label={data}>{truncated}</Tooltip>);
            }
            else {

                linkedToContent = data;
            }

            return (
                linkedTo ? <ClickHandler className={classNames({[compStyles.right]: rightAlign}, compStyles.link)}
                                         clickAction={() => RedirectService.redirect(linkedTo, data)}
                                         id={id}
                                         tag={"td"}
                                         label={data}>{linkedToContent}</ClickHandler> :
                    <td id={id} className={classNames({[compStyles.right]: rightAlign})}><Cell>{linkedToContent}</Cell></td>
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
            <div className={classNames(compStyles.wrapper, className, {[compStyles.detail]: detail}, {[compStyles.inset]: inset}, {[compStyles.workspaces]: workspaces})}>
                <table>
                    <thead>
                        <tr className={compStyles.header}>
                            {tableHeaders.map((tableHeader, h) => <HeaderCell key={h} column={tableHeader}/>)}
                        </tr>
                    </thead>
                    <tbody>
                        {singleRow ? <TableRow order={tableHeaders} row={tableRow}/> :
                            tableRows.map((tableRow, r) =>
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
