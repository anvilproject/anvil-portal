/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search facet component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardSearchFacetTermGroup from "../dashboard-search-facet-term-group/dashboard-search-facet-term-group";
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";
import { FacetSelectorNameDisplay } from "../../../utils/dashboard/facet-selector-name-display.model";

function DashboardSearchFacet(props) {
  const { facet, onOpenModal } = props;
  const { name: facetName, termGroups } = facet;

  return (
    <DashboardSearchPanel id={facetName}>
      <span id={`facetName-${facetName}`}>
        {FacetSelectorNameDisplay[facetName]}
      </span>
      {termGroups.map((termGroup, t) => (
        <DashboardSearchFacetTermGroup
          displayCount={4}
          facetName={facetName}
          key={t}
          onOpenModal={onOpenModal}
          termGroup={termGroup}
        />
      ))}
    </DashboardSearchPanel>
  );
}

export default DashboardSearchFacet;
