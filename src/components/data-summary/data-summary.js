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
import React from "react";

// App dependencies
import DataTable from "../data-table/data-table";
import {DashboardDetailStaticQuery} from "../../hooks/dashboard-detail-query";
import * as DashboardAccessibilityService from "../../utils/dashboard/dashboard-accessibility.service";
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

    const {consortia, dbgap} = props;
    const shared = props.public;
    const dashboardByAccessibility = DashboardAccessibilityService.filterDataByDBGapReadiness(DashboardDetailStaticQuery(), consortia, dbgap, shared);
    const dashboardSummary = DashboardSummaryService.getDashboardSummary(dashboardByAccessibility);
    const total = DashboardSummaryService.getDashboardSummaryTotals(dashboardSummary);
    const summary = dashboardSummary.concat(total);

    return (
        <DataSummary summary={summary}/>
    )
}
