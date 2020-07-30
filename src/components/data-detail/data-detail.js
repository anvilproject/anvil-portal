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
import * as DashboardWorkspaceService from "../../utils/dashboard/dashboard-workspace.service";

let TABLE_HEADERS_WORKSPACES = ["program", "projectId", "dbGapId", "dataType", "access", "subjects", "samples"];
let TABLE_HEADERS_WORKSPACES_BY_STUDY = ["program", "dbGapIdAccession", "studyName", "projectId", "diseases", "accessUI", "dataType", "subjects"];

class DataDetail extends React.Component {

    render() {
        const {details, withStudy} = this.props;
        const tableHeaders = withStudy ? TABLE_HEADERS_WORKSPACES_BY_STUDY : TABLE_HEADERS_WORKSPACES;
        return (
            <DataTable detail={!withStudy} tableHeaders={tableHeaders} tableRows={details} workspaces={!!withStudy}/>
        );
    }
}

export default (props) => {

    /* Dataset filtering props. */
    const dashboardContext = useContext(DashboardFilterContext),
        {results, resultsExist} = dashboardContext || {};

    /* Data detail component specific props. */
    const {consortia, dbgap, study} = props;
    const shared = props.public;

    /* Process bystudy prop into a boolean. */
    /* Due to rehype-react custom component parsing of props, a prop without a value
    /* will not be interpreted as true; instead, it will be passed as the empty string "". */
    const withStudy = study === "";

    /* Get the workspaces. */
    const details = DashboardWorkspaceService.getDashboardWorkspaces(consortia, dbgap, results, resultsExist, shared);
    const detailsExist = details.length > 0;

    return (
        resultsExist && detailsExist ? <DataDetail details={details} withStudy={withStudy}/> : null
    )
}
