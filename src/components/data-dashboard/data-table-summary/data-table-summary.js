/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table summary component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextDashboardFilter from "../context-dashboard-filter/context-dashboard-filter";
import DataTable from "../data-table/data-table";

// Styles
import compStyles from "./data-table-summary.module.css";

class DataTableSummary extends React.Component {

    render() {
        const {summaries, tableHeaders} = this.props;
        return (
            <>
            <h2 className={compStyles.headerNoBorder}>Search Summary</h2>
            <DataTable summary tableHeaders={tableHeaders} tableRows={summaries}/>
            </>
        );
    }
}

export default () => {

    /* Dataset searching props. */
    const {summaries, tableHeadersSummary} = useContext(ContextDashboardFilter);
    const showSummaries = summaries.length > 0;

    return (
        showSummaries ? <DataTableSummary summaries={summaries} tableHeaders={tableHeadersSummary}/> : null
    )
}
