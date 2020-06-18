/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data studies component.
 * Use of this component within markdown is possible.
 * Use the tag <data-studies></data-studies> but ensure it is closed.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataStudy from "../data-study/data-study";
import * as DashboardStudiesService from "../../utils/dashboard/dashboard-studies.service";

// Styles
import compStyles from "./data-studies.module.css";

class DataStudies extends React.Component {

    render() {
        const {studies} = this.props;
        return (
            <div className={compStyles.studies}>
                {studies.map((study, s) => <DataStudy key={s} study={study}/>)}
            </div>
        );
    }
}

export default () => {

    const studies = DashboardStudiesService.getDashboardStudies();

    return (
        <DataStudies studies={studies}/>
    )
}
