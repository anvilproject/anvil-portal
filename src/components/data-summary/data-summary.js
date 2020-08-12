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

// Template variables
const TABLE_HEADERS = ["consortium", "cohorts", "subjects", "samples","files", "sizeTB"];

class DataSummary extends React.Component {

    render() {
        const {summaries} = this.props;
        return (
            <>
            <h2>Search Summary</h2>
            <DataTable summary tableHeaders={TABLE_HEADERS} tableRows={summaries}/>
            </>
        );
    }
}

export default () => {

    /* Dataset searching props. */
    const searching = useContext(DashboardFilterContext),
        {summaries} = searching || {};

    const showSummaries = summaries.length > 0;

    return (
        showSummaries ? <DataSummary summaries={summaries}/> : null
    )
}
