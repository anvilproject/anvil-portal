/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data studies component.
 * Use of this component within markdown is possible.
 * Use the tag <data-studies></data-studies> but ensure it is closed.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import DashboardFilterContext from "../context/dashboard-filter-context";
import DataTable from "../data-table/data-table";
import * as DashboardStudiesService from "../../utils/dashboard/dashboard-studies.service";

// Styles
import compStyles from "./data-studies.module.css";

let TABLE_HEADERS_WORKSPACES = ["consortia", "dbGapIdAccession", "studyName", "projectId", "diseases", "access", "dataType", "subjects"];

class DataStudies extends React.Component {

    render() {
        const {studies} = this.props;
        const workspaces = DashboardStudiesService.buildStudiesWorkspaces(studies);
        return (
            <div className={compStyles.studies}>
                <DataTable workspaces
                           tableHeaders={TABLE_HEADERS_WORKSPACES}
                           tableRows={workspaces}/>
            </div>
        );
    }
}

export default () => {

    /* Dataset filtering props. */
    const dashboardContext = useContext(DashboardFilterContext),
        {results, resultsExist} = dashboardContext || {};

    const studies = DashboardStudiesService.getDashboardStudies(results, resultsExist);
    const studiesExist = studies.length > 0;

    return (
        resultsExist && studiesExist ? <DataStudies studies={studies}/> : null
    )
}
