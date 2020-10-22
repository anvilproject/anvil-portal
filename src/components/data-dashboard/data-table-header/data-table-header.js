/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table header component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataTableHeaderCell from "../data-table-header-cell/data-table-header-cell";

// Styles
import compStyles from "./data-table-header.module.css";

class DataTableHeader extends React.Component {

    render() {
        const {tableHeaders} = this.props;

        return (
            <thead>
                <tr className={compStyles.header}>
                    {tableHeaders.map((tableHeader, h) => <DataTableHeaderCell key={h} column={tableHeader}/>)}
                </tr>
            </thead>
        );
    }
}

export default DataTableHeader;
