/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search checkboxes component.
 * Wrapper component handling checkbox component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardSearchCheckboxesGroup from "../dashboard-search-checkboxes-group/dashboard-search-checkboxes-group";
import DashboardSearchCheckboxesPlaceholder from "../dashboard-search-checkboxes-placeholder/dashboard-search-checkboxes-placeholder";
import ModalDashboardFacetTermSelector from "../../modal/modal-dashboard-facet-term-selector/modal-dashboard-facet-term-selector";

function DashboardSearchCheckboxes(props) {
  const { dataset } = props;
  const { countLabel, facetCount, facets, setOfSummaryKeyTerms } = useContext(
    ContextDashboard
  );
  const loading = facets.length === 0;

  return (
    <>
      {facets.map((facet, f) => (
        <DashboardSearchCheckboxesGroup
          key={f}
          countLabel={countLabel}
          dataset={dataset}
          facet={facet}
          setOfSummaryKeyTerms={setOfSummaryKeyTerms}
        />
      ))}
      <DashboardSearchCheckboxesPlaceholder
        facetCount={facetCount}
        loading={loading}
      />
      <ModalDashboardFacetTermSelector dataset={dataset} />
    </>
  );
}

export default DashboardSearchCheckboxes;
