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

function DashboardSearchSelectedTerms(props) {
  const { facetName, onHandleClearTerm, termOperators } = props;
  const lastTerm = termOperators.length - 1;

  return termOperators.map((termOperator, t) => (
    <DashboardSearchSelectedTerm
      key={t}
      facetName={facetName}
      first={t === 0}
      last={t === lastTerm}
      onHandleClearTerm={onHandleClearTerm}
      termOperator={termOperator}
    />
  ));
}

export default DashboardSearchSelectedTerms;
