/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table toolbar component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardCopyURL from "../dashboard-copy-url/dashboard-copy-url";

// Styles
import compStyles from "./data-table-toolbar.module.css";

function DataTableToolbar(props) {

    const {children} = props;

    return (
        <div className={compStyles.toolbar}>
            {children}
            <DashboardCopyURL/>
        </div>
    );
}

export default DataTableToolbar;
