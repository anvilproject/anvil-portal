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
import ContextModal from "../../modal/context-modal/context-modal";
import ModalDashboardSearchCheckboxesGroup from "../../modal/modal-dashboard-search-checkboxes-group/modal-dashboard-search-checkboxes-group";

function DashboardSearchCheckboxes() {
  const { countLabel, facetSelectorFacets, setOfSummaryKeyTerms } = useContext(
    ContextDashboard
  );
  const { modal } = useContext(ContextModal);
  const { showModal } = modal;
  const facetCount = facetSelectorFacets.length;

  return (
    <>
      {facetSelectorFacets.map((facet, c) => (
        <DashboardSearchCheckboxesGroup
          key={c}
          countLabel={countLabel}
          facet={facet}
          facetCount={facetCount}
          setOfSummaryKeyTerms={setOfSummaryKeyTerms}
        />
      ))}
      <DashboardSearchCheckboxesPlaceholder facetCount={facetCount} />
      {showModal ? <ModalDashboardSearchCheckboxesGroup /> : null}
    </>
  );
}

export default DashboardSearchCheckboxes;
