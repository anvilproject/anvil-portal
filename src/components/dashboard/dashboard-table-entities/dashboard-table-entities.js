/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table entities component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardTable from "../dashboard-table/dashboard-table";
import DashboardTableToolbar from "../dashboard-table-toolbar/dashboard-table-toolbar";

// Styles
import compStyles from "./dashboard-table-entities.module.css";

function DashboardTableEntities(props) {

    /* Grab the entities. */
    const {entities, tableHeadersEntities} = useContext(ContextDashboard);
    const showEntities = entities.length > 0;

    return (
        showEntities ?
            <>
            <DashboardTableToolbar>
                <h2 className={compStyles.headerNoBorder}>Search Results</h2>
            </DashboardTableToolbar>
            <DashboardTable studies tableHeaders={tableHeadersEntities} tableRows={entities} {...props}/>
            </> : null
    );
}

export default DashboardTableEntities;
