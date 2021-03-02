/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search summary component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";

// Styles
import compStyles from "./dashboard-search-summary.module.css";

function DashboardSearchSummary() {

    const {summaries} = useContext(ContextDashboard);
    const total = summaries.find(summary => summary.platform === "Total"),
        {studies, subjectsTotal} = total || {};
    const studiesCount = studies ? studies.toLocaleString() : 0;
    const subjectCount = subjectsTotal ? subjectsTotal.toLocaleString() : 0;

    return (
        <DashboardSearchPanel inverted row>
            <h4 className={compStyles.label}>Current selection:</h4>
            <h4 className={compStyles.stat}>{studiesCount} Studies</h4>
            <h4 className={compStyles.stat}>{subjectCount} Subjects</h4>
        </DashboardSearchPanel>
    );
}

export default DashboardSearchSummary;
