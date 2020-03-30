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
import {DashboardStaticQuery} from "../../hooks/dashboardQuery";
import * as DashboardSummaryService from "../../utils/dashboard-summary.service";
import DataTable from "../data-table/data-table";

// Styles
import tableStyles from "../data-table/data-table.module.css";

let TABLE_HEADERS = ["program", "cohorts", "subjects", "samples","files", "sizeTB"];

class DataSummary extends React.Component {

    render() {
        const {summary} = this.props;
        return (
            <>
                <h3>Data Summary</h3>
                <DataTable className={tableStyles.summary} tableHeaders={TABLE_HEADERS} tableRows={summary}/>
            </>
        );
    }
}

export default () => {

    const programs = DashboardSummaryService.getDashboardSummary(DashboardStaticQuery());
    const total = DashboardSummaryService.getDashboardSummaryTotals(programs);
    const summary = programs.concat(total);

    return (
        <DataSummary summary={summary}/>
    )
}
