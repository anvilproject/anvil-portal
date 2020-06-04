/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data (study) workspaces component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataStudyCardTable from "../data-study-card-table/data-study-card-table";

// Template variables
let TABLE_HEADERS = ["workspaceId", "subjects", "samples", "dataType", "files", "size"];

class DataWorkspaces extends React.Component {

    render() {
        const {workspaces} = this.props;
        const title = "Terra Workspaces";
        return (
            <DataStudyCardTable tableHeaders={TABLE_HEADERS} tableRows={workspaces} title={title}/>
        );
    }
}

export default DataWorkspaces;
