/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search selected term component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./data-search-selected-term.module.css";

function DataSearchSelectedTerm(props) {

    const {facet, first, last, onHandleClearTerm, term} = props;

    return (
        <>
        <span>
            {first ? <span className={compStyles.bracket}>(</span> : <span className={compStyles.operator}>OR</span>}
            <span className={compStyles.term} onClick={() => onHandleClearTerm(facet, term)} role={"presentation"}>{term}</span>
            {last ? <span className={compStyles.bracket}>)</span> : null}
        </span>
        </>
    )
}

export default DataSearchSelectedTerm;
