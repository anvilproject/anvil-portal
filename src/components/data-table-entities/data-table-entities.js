/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table entities component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import DashboardFilterContext from "../context/dashboard-filter-context";
import DataTable from "../data-table/data-table";

class DataTableEntities extends React.Component {

    render() {
        const {entities, tableHeaders, ...props} = this.props;
        return (
            <>
            <h2>Search Results</h2>
            <DataTable studies tableHeaders={tableHeaders} tableRows={entities} {...props}/>
            </>
        );
    }
}

export default (props) => {

    /* Grab the entities. */
    const searching = useContext(DashboardFilterContext),
        {entities, tableHeadersEntities} = searching || {};

    const showEntities = entities.length > 0;

    return (
        showEntities ? <DataTableEntities entities={entities} tableHeaders={tableHeadersEntities} {...props}/> : null
    )
}
