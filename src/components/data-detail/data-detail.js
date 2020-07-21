/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data detail component.
 * Use of this component within markdown is possible.
 * Use the tag <data-detail></data-detail> but ensure it is closed.
 *
 * The following props are optional and do not require a value:
 * - "consortia"
 * - "dbgap"
 * - "public"
 *
 * "consortia" will return all private workspaces without a dbGapId accession value.
 * "dbgap" will return all workspaces with a dbGapId accession value (note the lower case "g").
 * "public" will return all public workspaces without a dbGapId accession value.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataTable from "../data-table/data-table";
import * as DashboardWorkspaceService from "../../utils/dashboard/dashboard-workspace.service";

// Styles
import tableStyles from "../data-table/data-table.module.css";

let TABLE_HEADERS = ["program", "projectId", "dbGapId", "dataType", "access", "subjects", "samples"];

class DataDetail extends React.Component {

    render() {
        const {details} = this.props;
        return (
            <DataTable className={tableStyles.detail} tableHeaders={TABLE_HEADERS} tableRows={details}/>
        );
    }
}

export default (props) => {

    const {consortia, dbgap} = props;
    const shared = props.public;
    const details = DashboardWorkspaceService.getDashboardWorkspaces(consortia, dbgap, shared);

    return (
        <DataDetail details={details}/>
    )
}
