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
import compStyles from "./dashboard-search-selected-facets.module.css";

function DashboardSearchSelectedFacets(props) {
  const {
    onHandleClearFacet,
    onHandleClearSearch,
    onHandleClearTerm,
    selectedTermsByFacet
  } = props;
  const selectedFacets = selectedTermsByFacet.keys();

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
          selectedTermsByFacet={selectedTermsByFacet}
        />
      ))}
      <DashboardSearchSelectedClearAll
        onHandleClearSearch={onHandleClearSearch}
      />
    </span>
  );
}

export default DashboardSearchSelectedFacets;
