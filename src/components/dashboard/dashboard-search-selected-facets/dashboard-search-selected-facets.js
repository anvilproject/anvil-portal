/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search selected facets component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardSearchSelectedClearAll from "../dashboard-search-selected-clear-all/dashboard-search-selected-clear-all";
import DashboardSearchSelectedFacet from "../dashboard-search-selected-facet/dashboard-search-selected-facet";

// Styles
import * as compStyles from "./dashboard-search-selected-facets.module.css";

function DashboardSearchSelectedFacets(props) {
  const {
    onHandleClearAll,
    onHandleClearFacet,
    onHandleClearTerm,
    selectedTermOperatorsByFacet,
  } = props;
  const selectedFacets = selectedTermOperatorsByFacet.keys();

  return (
    <span className={compStyles.selectedFacets}>
      <span className={compStyles.label}>Query:</span>
      {[...selectedFacets].map((facet, f) => (
        <DashboardSearchSelectedFacet
          key={f}
          facet={facet}
          first={f === 0}
          onHandleClearFacet={onHandleClearFacet}
          onHandleClearTerm={onHandleClearTerm}
          selectedTermOperatorsByFacet={selectedTermOperatorsByFacet}
        />
      ))}
      <DashboardSearchSelectedClearAll onHandleClearAll={onHandleClearAll} />
    </span>
  );
}

export default DashboardSearchSelectedFacets;
