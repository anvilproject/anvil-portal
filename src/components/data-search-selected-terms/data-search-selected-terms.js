/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search selected terms component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataSearchSelectedTerm from "../data-search-selected-term/data-search-selected-term";

// Styles
import compStyles from "./data-search-selected-terms.module.css";

function DataSearchSelectedTerms(props) {

    const {facet, onHandleClearTerm, terms} = props;
    const lastTerm = terms.length - 1;

    return (
        <span className={compStyles.terms}>
            {terms.map((term, t) => <DataSearchSelectedTerm key={t}
                                                       facet={facet}
                                                       first={t===0}
                                                       last={t===lastTerm}
                                                       onHandleClearTerm={onHandleClearTerm}
                                                       term={term}/>)}
        </span>
    )
}

export default DataSearchSelectedTerms;
