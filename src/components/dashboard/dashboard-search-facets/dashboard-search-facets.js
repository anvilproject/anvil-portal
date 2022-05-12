/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search facets component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardSearchFacetPlaceholder from "../dashboard-search-facet-placeholder/dashboard-search-facet-placeholder";
import DashboardSearchFacet from "../dashboard-search-facet/dashboard-search-facet";
import ModalDashboardFacetTermSelector from "../../modal/modal-dashboard-facet-term-selector/modal-dashboard-facet-term-selector";

function DashboardSearchFacets() {
  const { facets, setOfSummaryKeyTerms } = useContext(ContextDashboard);
  const loading = facets.length === 0;

  return (
    <>
      {facets.map((facet) =>
        facet.termGroups.map((termGroup, t) => (
          <DashboardSearchFacet
            key={t}
            facetName={facet.name}
            termGroup={termGroup}
            setOfSummaryKeyTerms={setOfSummaryKeyTerms}
          />
        ))
      )}
      <DashboardSearchFacetPlaceholder loading={loading} />
      <ModalDashboardFacetTermSelector />
    </>
  );
}

export default DashboardSearchFacets;
