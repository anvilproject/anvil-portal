/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data studies component.
 * Use of this component within markdown is possible.
 * Use the tag <data-studies></data-studies> but ensure it is closed.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import DashboardFilterContext from "../context/dashboard-filter-context";
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

    /* Dataset filtering props. */
    const dashboardContext = useContext(DashboardFilterContext),
        {dashboardFilterProps} = dashboardContext || {},
        {query, results, resultsExist} = dashboardFilterProps || {};

    const studies = DashboardStudiesService.getDashboardStudies(query, results);

    return (
        resultsExist ? <DataStudies studies={studies}/> : null
    )
}
