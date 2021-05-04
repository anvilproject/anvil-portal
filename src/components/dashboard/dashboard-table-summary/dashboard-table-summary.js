/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table summary component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardTable from "../dashboard-table/dashboard-table";

// Styles
import compStyles from "./dashboard-table-summary.module.css";

class DashboardTableSummary extends React.Component {

    render() {
        const {summaries, tableHeaders} = this.props;
        return (
            <>
            <h2 className={compStyles.headerNoBorder}>Search Summary</h2>
            <DashboardTable dataset={"summary"} tableHeaders={tableHeaders} tableRows={summaries}/>
            </>
        );
    }
}

export default () => {

    /* Dataset searching props. */
    const {summaries, tableHeadersSummary} = useContext(ContextDashboard);
    const showSummaries = summaries.length > 0;

    return (
        showSummaries ? <DashboardTableSummary summaries={summaries} tableHeaders={tableHeadersSummary}/> : null
    )
}
