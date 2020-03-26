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
import {DashboardStaticQuery} from "../../hooks/dashboardQuery";
import * as DashboardDetailService from "../../utils/dashboard-detail.service";
import DataTable from "../data-table/data-table";

// Styles
import tableStyles from "../data-table/data-table.module.css";

let TABLE_HEADERS = ["projectId", "program", "publicData", "demographics", "samples","files","size"];

class DataDetail extends React.Component {

    render() {
        const {details} = this.props;
        return (
            <>
                <h2>Data Detail</h2>
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
