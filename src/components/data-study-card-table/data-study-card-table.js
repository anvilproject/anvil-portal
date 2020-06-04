/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data (study) card table component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataTable from "../data-table/data-table";

// Styles
import compStyles from "./data-study-card-table.module.css";
import tableStyles from  "../data-table/data-table.module.css";

class DataStudyCardTable extends React.Component {

    render() {
        const {tableHeaders, tableRows, title} = this.props;
        return (
            <div className={compStyles.container}>
                <div className={compStyles.title}>{title}</div>
                <DataTable className={tableStyles.study} tableHeaders={tableHeaders} tableRows={tableRows}/>
            </div>
        );
    }
}

export default DataStudyCardTable;
