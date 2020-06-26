/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data detail component.
 * Use of this component within markdown is possible.
 * Use the tag <data-detail dbGapAccessible=false></data-detail> but ensure it is closed.
 *
 * The prop "dbGapAccessible" is an optional boolean value.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataTable from "../data-table/data-table";
import * as DashboardDetailService from "../../utils/dashboard/dashboard-detail.service";

// Styles
import tableStyles from "../data-table/data-table.module.css";

let TABLE_HEADERS = ["program", "projectId", "dbGapIdAccession", "dataType", "access", "subjects", "samples"];

class DataDetail extends React.Component {

    render() {
        const {details} = this.props;
        return (
            <DataTable className={tableStyles.detail} tableHeaders={TABLE_HEADERS} tableRows={details}/>
        );
    }
}

export default (props) => {

    const dbGapAccessible = props.dbgapaccessible;
    const details = DashboardDetailService.getDashboardDetail(dbGapAccessible);

    return (
        <DataDetail details={details}/>
    )
}
