/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataTableBody from "../data-table-body/data-table-body";
import DataTableHeader from "../data-table-header/data-table-header";
import * as DashboardTableService from "../../utils/dashboard/dashboard-table.service";

// Styles
import compStyles from "./data-table.module.css";

class DataTable extends React.Component {

    render() {
        const {singleRow, studies, summary, tableHeaders, tableRow, tableRows, workspaces} = this.props;
        const tableName = DashboardTableService.getTableName(studies, summary, workspaces);
        const identifier = Date.now();
        const tableId = `${tableName}${identifier}`;

        return (
            <div className={compStyles.wrapper} id={tableId}>
                <table>
                    <DataTableHeader tableHeaders={tableHeaders}/>
                    <DataTableBody singleRow={singleRow}
                                   summary={summary}
                                   tableHeaders={tableHeaders}
                                   tableRow={tableRow}
                                   tableRows={tableRows}/>
                </table>
            </div>
        );
    }
}

export default DataTable;
