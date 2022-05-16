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
import DashboardSearchFacet from "../dashboard-search-facet/dashboard-search-facet";
import DashboardSearchFacetPlaceholder from "../dashboard-search-facet-placeholder/dashboard-search-facet-placeholder";
import ContextModal from "../../modal/context-modal/context-modal";
import ModalDashboardFacetTermSelector from "../../modal/modal-dashboard-facet-term-selector/modal-dashboard-facet-term-selector";

function DashboardSearchFacets() {
  const { facets } = useContext(ContextDashboard);
  const { onOpenModal } = useContext(ContextModal);
  const loading = facets.length === 0;

  return (
    <>
      {facets.map((facet, f) => (
        <DashboardSearchFacet key={f} facet={facet} onOpenModal={onOpenModal} />
      ))}
      <DashboardSearchFacetPlaceholder loading={loading} />
      <ModalDashboardFacetTermSelector />
    </>
  );
}

export default DashboardSearchFacets;
