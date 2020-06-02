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
import DataStudyCard from "../data-study-card/data-study-card";
import * as DashboardStudiesService from "../../utils/dashboard/dashboard-studies.service";

// Styles
import compStyles from "./data-studies.module.css";

class DataStudies extends React.Component {

    render() {
        const {studies} = this.props;
        return (
            <div className={compStyles.studies}>
                <h2>Studies</h2>
                {studies.map((study, s) => <DataStudyCard key={s} study={study}/>)}
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
