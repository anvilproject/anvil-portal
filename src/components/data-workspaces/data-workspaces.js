/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data workspaces component.
 * Use of this component within markdown is possible.
 * Use the tag <data-workspaces></data-workspaces>.
 *
 * The following props are optional and do not require a value:
 * - "consortia"
 * - "dbgap"
 * - "public"
 * - "study"
 *
 * - "consortia" will return all private workspaces without a dbGapId accession value.
 * - "dbgap" will return all workspaces with a dbGapId accession value (note the lower case "g").
 * - "public" will return all public workspaces without a dbGapId accession value.
 * - "study" will return all workspaces, and render the table with additional information
 *    on corresponding studies and the diseases, should they exist for the workspace.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import DashboardFilterContext from "../context/dashboard-filter-context";
import DataTable from "../data-table/data-table";
import * as DashboardService from "../../utils/dashboard/dashboard.service";
import * as DashboardWorkspaceService from "../../utils/dashboard/dashboard-workspace.service";

let TABLE_HEADERS_WORKSPACES = ["consortium", "projectId", "dbGapId", "dataTypes", "access", "subjects", "samples"];
let TABLE_HEADERS_WORKSPACES_BY_STUDY = ["consortium", "projectId", "gapId", "studyName", "diseases", "accessUI", "dataTypes", "subjects"];

class DataWorkspaces extends React.Component {

    render() {
        const {withStudy, workspaces} = this.props;
        const tableHeaders = withStudy ? TABLE_HEADERS_WORKSPACES_BY_STUDY : TABLE_HEADERS_WORKSPACES;
        return (
            <DataTable studies={!!withStudy} tableHeaders={tableHeaders} tableRows={workspaces} workspaces={!withStudy}/>
        );
    }
}

export default (props) => {

    /* Dataset filtering props. */
    const searching = useContext(DashboardFilterContext),
        {results, resultsExist} = searching || {};

    /* Data detail component specific props. */
    const {consortia, dbgap, study} = props;
    const shared = props.public;

    /* Determine whether the workspaces table includes study data. */
    const withStudy = DashboardService.parseRehypeProp(study);

    /* Get the workspaces. */
    const workspaces = DashboardWorkspaceService.getDashboardWorkspaces(consortia, dbgap, results, resultsExist, shared);

    return (
        resultsExist ? <DataWorkspaces withStudy={withStudy} workspaces={workspaces}/> : null
    )
}
