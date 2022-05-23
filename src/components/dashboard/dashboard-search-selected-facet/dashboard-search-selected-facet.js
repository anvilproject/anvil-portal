/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search selected facet component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardSearchSelectedTerms from "../dashboard-search-selected-terms/dashboard-search-selected-terms";
import { FacetSelectorNameDisplay } from "../../../utils/dashboard/facet-selector-name-display.model";

// Styles
import * as compStyles from "./dashboard-search-selected-facet.module.css";

function DashboardSearchSelectedFacet(props) {
  const {
    facetName,
    first,
    onHandleClearFacet,
    onHandleClearTerm,
    selectedTermOperatorsByFacetName,
  } = props;
  const facetDisplay = FacetSelectorNameDisplay[facetName];
  const termOperators = selectedTermOperatorsByFacetName.get(facetName);

  return (
    <>
      {first ? null : <span className={compStyles.operator}>AND</span>}
      <span
        className={compStyles.facetName}
        onClick={() => onHandleClearFacet(facetName)}
        role={"presentation"}
      >
        {facetDisplay}
      </span>
      <DashboardSearchSelectedTerms
        facetName={facetName}
        onHandleClearTerm={onHandleClearTerm}
        termOperators={termOperators}
      />
    </>
  );
}

export default DashboardSearchSelectedFacet;
