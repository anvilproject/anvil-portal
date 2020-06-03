/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data (study) workspaces component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataStudySnapshotTable from "../data-study-snapshot-table/data-study-snapshot-table";

// Template variables
let TABLE_HEADERS = ["workspaceId", "subjects", "samples", "dataType", "files", "size"];

class DataWorkspaces extends React.Component {

    render() {
        const {count, subjectsTotal, workspaces} = this.props;
        const countError = subjectsTotal !== count;
        const subTitle = `Subjects: ${subjectsTotal} of ${count}`;
        const title = "Terra Workspaces";
        return (
            <DataStudySnapshotTable countError={countError} subTitle={subTitle} tableHeaders={TABLE_HEADERS} tableRows={workspaces} title={title}/>
        );
    }
}

export default DataWorkspaces;
