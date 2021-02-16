/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard summary component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardTable from "../dashboard-table/dashboard-table";

// Styles
import compStyles from "./dashboard-summary.module.css";

class DashboardSummary extends React.Component {

    render() {
        const {summaries, tableHeaders} = this.props;
        return (
            <>
            <h2 className={compStyles.headerNoBorder}>Search Summary</h2>
            <DashboardTable summary tableHeaders={tableHeaders} tableRows={summaries}/>
            </>
        );
    }
}

export default () => {

    /* Dataset searching props. */
    const {summaries, tableHeadersSummary} = useContext(ContextDashboard);

    const showSummaries = summaries.length > 0;

    return (
        showSummaries ? <DashboardSummary summaries={summaries} tableHeaders={tableHeadersSummary}/> : null
    )
}
