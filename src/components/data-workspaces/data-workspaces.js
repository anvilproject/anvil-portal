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

// Styles
import compStyles from "./data-workspaces.module.css";

// Template variables
const TABLE_HEADERS_WORKSPACES_BY_STUDY = ["consortium", "projectId", "gapId", "studyName", "diseases", "accessType", "dataTypes", "size", "subjects"];

class DataWorkspaces extends React.Component {

    render() {
        const {workspaces} = this.props;
        return (
            <>
            <h2 class={compStyles.headerNoBorder}>Search Results</h2>
            <DataTable studies tableHeaders={TABLE_HEADERS_WORKSPACES_BY_STUDY} tableRows={workspaces}/>
            </>
        );
    }
}

export default () => {

    /* Grab the workspaces. */
    const searching = useContext(DashboardFilterContext),
        {workspaces} = searching || {};

    const showWorkspaces = workspaces.length > 0;

    return (
        showWorkspaces ? <DataWorkspaces workspaces={workspaces}/> : null
    )
}
