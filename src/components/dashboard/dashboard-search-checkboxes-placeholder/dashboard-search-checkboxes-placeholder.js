/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard checkboxes placeholder component.
 * A placeholder facet search panel, used when total number of facets is odd.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";
import * as DashboardSearchService from "../../../utils/dashboard/dashboard-search.service";

function DashboardSearchCheckboxesPlaceholder(props) {
  const { facetCount, loading } = props;
  const facetCountUneven = DashboardSearchService.isDashboardCheckboxesUneven(
    facetCount
  );
  const showPlaceholder = !loading && facetCountUneven;

  return showPlaceholder ? <DashboardSearchPanel placeholder /> : null;
}

export default DashboardSearchCheckboxesPlaceholder;
