/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard workspaces component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardTable from "../dashboard-table/dashboard-table";
import DashboardTableToolbar from "../dashboard-table-toolbar/dashboard-table-toolbar";

// Styles
import compStyles from "./dashboard-workspaces.module.css";

class DashboardWorkspaces extends React.Component {

    render() {
        const {tableHeaders, workspaces} = this.props;
        return (
            <>
            <DashboardTableToolbar>
                <h2 className={compStyles.headerNoBorder}>Search Results</h2>
            </DashboardTableToolbar>
            <DashboardTable studies tableHeaders={tableHeaders} tableRows={workspaces}/>
            </>
        );
    }
}

export default () => {

    /* Grab the workspaces. */
    const {tableHeadersEntities, workspaces} = useContext(ContextDashboard);
    const showWorkspaces = workspaces.length > 0;

    return (
        showWorkspaces ? <DashboardWorkspaces tableHeaders={tableHeadersEntities} workspaces={workspaces}/> : null
    )
}
