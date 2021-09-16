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

// Styles
import * as compStyles from "./dashboard-table.module.css";

class DashboardTable extends React.Component {
  render() {
    const { dataset, tableHeaders, tableRows } = this.props;
    const identifier = Date.now();
    const tableId = `${dataset}${identifier}`;

    return (
      <div className={compStyles.wrapper} id={tableId}>
        <table>
          <DashboardTableHeader dataset={dataset} tableHeaders={tableHeaders} />
          <DashboardTableBody
            dataset={dataset}
            tableHeaders={tableHeaders}
            tableRows={tableRows}
          />
        </table>
      </div>
    );
  }
}

export default DashboardTable;
