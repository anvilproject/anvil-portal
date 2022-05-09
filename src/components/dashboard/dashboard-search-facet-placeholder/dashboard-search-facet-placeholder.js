/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard facet placeholder component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";

function DashboardSearchFacetPlaceholder(props) {
  const { loading } = props;
  const showPlaceholder = !loading;

  return showPlaceholder ? <DashboardSearchPanel id={"placeholder"} /> : null;
}

export default DashboardSearchFacetPlaceholder;
