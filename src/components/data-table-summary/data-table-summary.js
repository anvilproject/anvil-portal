/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table summary component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import DashboardFilterContext from "../context/dashboard-filter-context";
import DataTable from "../data-table/data-table";

class DataTableSummary extends React.Component {

    render() {
        const {summaries, tableHeaders} = this.props;
        return (
            <>
            <h2>Search Summary</h2>
            <DataTable summary tableHeaders={tableHeaders} tableRows={summaries}/>
            </>
        );
    }
}

export default () => {

    /* Dataset searching props. */
    const searching = useContext(DashboardFilterContext),
        {summaries, tableHeadersSummary} = searching || {};

    const showSummaries = summaries.length > 0;

    return (
        showSummaries ? <DataTableSummary summaries={summaries} tableHeaders={tableHeadersSummary}/> : null
    )
}
