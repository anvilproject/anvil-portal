/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardTableBody from "../dashboard-table-body/dashboard-table-body";
import DashboardTableHeader from "../dashboard-table-header/dashboard-table-header";
import * as DashboardTableService from "../../../utils/dashboard/dashboard-table.service";

// Styles
import compStyles from "./dashboard-table.module.css";

class DashboardTable extends React.Component {

    render() {
        const {ncpi, singleRow, studies, summary, tableHeaders, tableRow, tableRows} = this.props;
        const tableName = DashboardTableService.getTableName(ncpi, studies, summary);
        const identifier = Date.now();
        const tableId = `${tableName}${identifier}`;

        return (
            <div className={compStyles.wrapper} id={tableId}>
                <table>
                    <DashboardTableHeader tableHeaders={tableHeaders}/>
                    <DashboardTableBody singleRow={singleRow}
                                        summary={summary}
                                        tableHeaders={tableHeaders}
                                        tableRow={tableRow}
                                        tableRows={tableRows}/>
                </table>
            </div>
        );
    }
}

export default DashboardTable;
