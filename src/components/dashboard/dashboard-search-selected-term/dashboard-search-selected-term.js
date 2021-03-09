/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search selected term component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./dashboard-search-selected-term.module.css";

function DashboardSearchSelectedTerm(props) {

    const {facet, first, last, onHandleClearTerm, term} = props;
    const operator = facet === "search" ? "AND" : "OR";

    return (
        <>
        <span>
            {first ? <span className={compStyles.bracket}>(</span> : <span className={compStyles.operator}>{operator}</span>}
            <span className={compStyles.term} onClick={() => onHandleClearTerm(facet, term)} role={"presentation"}>{term}</span>
            {last ? <span className={compStyles.bracket}>)</span> : null}
        </span>
        </>
    )
}

export default DashboardSearchSelectedTerm;
