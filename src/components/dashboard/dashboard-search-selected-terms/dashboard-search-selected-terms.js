/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search selected terms component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardSearchSelectedTerm from "../dashboard-search-selected-term/dashboard-search-selected-term";

// Styles
import compStyles from "./dashboard-search-selected-terms.module.css";

function DashboardSearchSelectedTerms(props) {

    const {facet, onHandleClearTerm, terms} = props;
    const lastTerm = terms.length - 1;

    return (
        <span className={compStyles.terms}>
            {terms.map((term, t) =>
                <DashboardSearchSelectedTerm key={t}
                                             facet={facet}
                                             first={t===0}
                                             last={t===lastTerm}
                                             onHandleClearTerm={onHandleClearTerm}
                                             term={term}/>)}
        </span>
    )
}

export default DashboardSearchSelectedTerms;
