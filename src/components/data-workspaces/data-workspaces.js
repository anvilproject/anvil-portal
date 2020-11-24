/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data workspaces component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import DashboardFilterContext from "../context/dashboard-filter-context";
import DataTable from "../data-table/data-table";
import DataTableToolbar from "../data-table-toolbar/data-table-toolbar";

// Styles
import compStyles from "./data-workspaces.module.css";

class DataWorkspaces extends React.Component {

    render() {
        const {tableHeaders, workspaces} = this.props;
        return (
            <>
            <DataTableToolbar>
                <h2 className={compStyles.headerNoBorder}>Search Results</h2>
            </DataTableToolbar>
            <DataTable studies tableHeaders={tableHeaders} tableRows={workspaces}/>
            </>
        );
    }
}

export default () => {

    /* Grab the workspaces. */
    const {tableHeadersEntities, workspaces} = useContext(DashboardFilterContext);
    const showWorkspaces = workspaces.length > 0;

    return (
        showWorkspaces ? <DataWorkspaces tableHeaders={tableHeadersEntities} workspaces={workspaces}/> : null
    )
}
