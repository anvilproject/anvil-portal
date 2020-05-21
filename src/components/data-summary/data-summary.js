/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data summary component.
 * Use of this component within markdown is possible.
 * Use the tag <data-summary></data-summary> but ensure it is closed.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataTable from "../data-table/data-table";
import {DashboardStaticQuery} from "../../hooks/dashboard-query";
import * as DashboardAccessibilityService from "../../utils/dashboard/dashboard-accessibility.service";
import * as DashboardSummaryService from "../../utils/dashboard/dashboard-summary.service";

// Styles
import tableStyles from "../data-table/data-table.module.css";

let TABLE_HEADERS = ["program", "cohorts", "subjects", "samples","files", "sizeTB"];

class DataSummary extends React.Component {

    render() {
        const {summary} = this.props;
        return (
            <>
                <DataTable className={tableStyles.summary} tableHeaders={TABLE_HEADERS} tableRows={summary}/>
            </>
        );
    }
}

export default (props) => {

    const dbGapAccessible = props.dbgapaccessible;
    const dashboardByAccessibility = DashboardAccessibilityService.filterDataByDBGapReadiness(DashboardStaticQuery(), dbGapAccessible);
    const dashboardSummary = DashboardSummaryService.getDashboardSummary(dashboardByAccessibility);
    const total = DashboardSummaryService.getDashboardSummaryTotals(dashboardSummary);
    const summary = dashboardSummary.concat(total);

    return (
        <DataSummary summary={summary}/>
    )
}
