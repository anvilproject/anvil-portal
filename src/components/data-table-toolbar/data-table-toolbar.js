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
import DashboardDownloadTSV from "../dashboard-download-tsv/dashboard-download-tsv";

// Styles
import compStyles from "./data-table-toolbar.module.css";

function DataTableToolbar(props) {

    const {children} = props;

    return (
        <div className={compStyles.toolbar}>
            {children}
            <span className={compStyles.tools}>
                <DashboardDownloadTSV/>
                <DashboardCopyURL/>
            </span>
        </div>
    );
}

export default DataTableToolbar;
