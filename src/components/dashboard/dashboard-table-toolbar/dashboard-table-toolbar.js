/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table toolbar component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardCopyURL from "../dashboard-copy-url/dashboard-copy-url";
import DashboardDownloadTSV from "../dashboard-download-tsv/dashboard-download-tsv";

// Styles
import compStyles from "./dashboard-table-toolbar.module.css";

function DashboardTableToolbar(props) {

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

export default DashboardTableToolbar;
