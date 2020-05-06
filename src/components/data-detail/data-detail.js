/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data detail component.
 * Use of this component within markdown is possible.
 * Use the tag <data-detail></data-detail> but ensure it is closed.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataTable from "../data-table/data-table";
import {DashboardStaticQuery} from "../../hooks/dashboard-query";
import * as DashboardDetailService from "../../utils/dashboard-detail.service";

// Styles
import tableStyles from "../data-table/data-table.module.css";

let TABLE_HEADERS = ["program", "projectId", "dbGapId", "access", "demographics", "samples","files","size"];

class DataDetail extends React.Component {

    render() {
        const {details} = this.props;
        return (
            <>
                <h3>Data Detail</h3>
                <DataTable className={tableStyles.detail} tableHeaders={TABLE_HEADERS} tableRows={details}/>
            </>
        );
    }
}

export default () => {

    const details = DashboardDetailService.getDashboardDetail(DashboardStaticQuery());

    return (
        <DataDetail details={details}/>
    )
}
