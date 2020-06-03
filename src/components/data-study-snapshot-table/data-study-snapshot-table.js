/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data (study) nested summary table component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataTable from "../data-table/data-table";

// Styles
import compStyles from "./data-study-snapshot-table.module.css";
import tableStyles from  "../data-table/data-table.module.css";

let classNames = require("classnames");

class DataStudySnapshotTable extends React.Component {

    render() {
        const {countError, subTitle, tableHeaders, tableRows, title} = this.props;
        return (
            <div className={compStyles.summary}>
                <div className={compStyles.title}>{title}</div>
                {subTitle ? <div className={classNames({[compStyles.error]: countError}, compStyles.subTitle)}>{subTitle}</div> : null}
                <DataTable className={tableStyles.study} tableHeaders={tableHeaders} tableRows={tableRows}/>
            </div>
        );
    }
}

export default DataStudySnapshotTable;
