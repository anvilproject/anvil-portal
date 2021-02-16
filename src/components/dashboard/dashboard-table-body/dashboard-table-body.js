/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table body component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardTableRow from "../dashboard-table-row/dashboard-table-row";

class DashboardTableBody extends React.Component {

    render() {
        const {singleRow, summary, tableHeaders, tableRow, tableRows} = this.props;

        return (
            <tbody>
                {singleRow ? <DashboardTableRow order={tableHeaders} row={tableRow}/> :
                tableRows.map((tableRow, r) =>
                    <DashboardTableRow key={r}
                                       order={tableHeaders}
                                       row={tableRow}
                                       summary={summary}/>)}
            </tbody>
        );
    }
}

export default DashboardTableBody;
