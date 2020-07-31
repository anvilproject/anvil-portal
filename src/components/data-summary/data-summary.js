/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data summary component.
 * Use of this component within markdown is possible.
 * Use the tag <data-summary></data-summary> but ensure it is closed.
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
import React, {useContext} from "react";

// App dependencies
import DashboardFilterContext from "../context/dashboard-filter-context";
import DataTable from "../data-table/data-table";
import * as DashboardSummaryService from "../../utils/dashboard/dashboard-summary.service";

// Styles
import tableStyles from "../data-table/data-table.module.css";

let TABLE_HEADERS = ["program", "cohorts", "subjects", "samples","files", "sizeTB"];

class DataSummary extends React.Component {

    render() {
        const {summary} = this.props;
        return (
            <DataTable className={tableStyles.summary} tableHeaders={TABLE_HEADERS} tableRows={summary}/>
        );
    }
}

export default (props) => {

    /* Dataset filtering props. */
    const dashboardContext = useContext(DashboardFilterContext),
        {results, resultsExist} = dashboardContext || {};

    /* Data summary component specific props. */
    const {consortia, dbgap} = props;
    const shared = props.public;

    const summary = DashboardSummaryService.getDashboardSummary(consortia, dbgap, results, resultsExist, shared);

    return (
        resultsExist ? <DataSummary summary={summary}/> : null
    )
}
