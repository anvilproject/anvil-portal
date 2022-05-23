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
    selectedTermOperatorsByFacetName,
  } = props;
  const selectedFacetNames = selectedTermOperatorsByFacetName.keys();

  return (
    <span className={compStyles.selectedFacets}>
      <span className={compStyles.label}>Query:</span>
      {[...selectedFacetNames].map((facetName, f) => (
        <DashboardSearchSelectedFacet
          key={f}
          facetName={facetName}
          first={f === 0}
          onHandleClearFacet={onHandleClearFacet}
          onHandleClearTerm={onHandleClearTerm}
          selectedTermOperatorsByFacetName={selectedTermOperatorsByFacetName}
        />
      ))}
      <DashboardSearchSelectedClearAll onHandleClearAll={onHandleClearAll} />
    </span>
  );
}

export default DashboardSearchSelectedFacets;
