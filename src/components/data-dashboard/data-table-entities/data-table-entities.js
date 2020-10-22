/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table entities component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextDashboardFilter from "../context-dashboard-filter/context-dashboard-filter";
import DataTable from "../data-table/data-table";

// Styles
import compStyles from "./data-table-entities.module.css";

class DataTableEntities extends React.Component {

    render() {
        const {entities, tableHeaders, ...props} = this.props;
        return (
            <>
            <h2 className={compStyles.headerNoBorder}>Search Results</h2>
            <DataTable studies tableHeaders={tableHeaders} tableRows={entities} {...props}/>
            </>
        );
    }
}

export default (props) => {

    /* Grab the entities. */
    const {entities, tableHeadersEntities} = useContext(ContextDashboardFilter);

    const showEntities = entities.length > 0;

    return (
        showEntities ? <DataTableEntities entities={entities} tableHeaders={tableHeadersEntities} {...props}/> : null
    )
}
