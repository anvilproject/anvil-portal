/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table header component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardTableHeaderCell from "../dashboard-table-header-cell/dashboard-table-header-cell";

// Styles
import compStyles from "./dashboard-table-header.module.css";

class DashboardTableHeader extends React.Component {

    render() {
        const {tableHeaders} = this.props;

        return (
            <thead>
                <tr className={compStyles.header}>
                    {tableHeaders.map((tableHeader, h) => <DashboardTableHeaderCell key={h} column={tableHeader}/>)}
                </tr>
            </thead>
        );
    }
}

export default DashboardTableHeader;
