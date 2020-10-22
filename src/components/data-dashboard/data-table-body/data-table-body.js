/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table body component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataTableRow from "../data-table-row/data-table-row";

class DataTableBody extends React.Component {

    render() {
        const {singleRow, summary, tableHeaders, tableRow, tableRows} = this.props;

        return (
            <tbody>
                {singleRow ? <DataTableRow order={tableHeaders} row={tableRow}/> :
                tableRows.map((tableRow, r) =>
                    <DataTableRow key={r}
                                  order={tableHeaders}
                                  row={tableRow}
                                  summary={summary}/>)}
            </tbody>
        );
    }
}

export default DataTableBody;
