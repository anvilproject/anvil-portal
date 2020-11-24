/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data summary component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import DashboardFilterContext from "../context/dashboard-filter-context";
import DataTable from "../data-table/data-table";

// Styles
import compStyles from "./data-summary.module.css";

class DataSummary extends React.Component {

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
    const {summaries, tableHeadersSummary} = useContext(DashboardFilterContext);

    const showSummaries = summaries.length > 0;

    return (
        showSummaries ? <DataSummary summaries={summaries} tableHeaders={tableHeadersSummary}/> : null
    )
}
