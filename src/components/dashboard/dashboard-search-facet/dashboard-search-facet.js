/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search facet component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import DashboardSearchFacetCheckboxSelect from "../dashboard-search-facet-checkbox-select/dashboard-search-facet-checkbox-select";
import DashboardSearchFacetShowMore from "../dashboard-search-facet-show-more/dashboard-search-facet-show-more";
import DashboardSearchFacetToggleSelect from "../dashboard-search-facet-toggle-select/dashboard-search-facet-toggle-select";
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";
import ContextModal from "../../modal/context-modal/context-modal";
import * as DashboardSearchService from "../../../utils/dashboard/dashboard-search.service";
import FacetSelectionControl from "../../../utils/dashboard/facet-selection-control.model";
import { FacetSelectorNameDisplay } from "../../../utils/dashboard/facet-selector-name-display.model";

// Template variables
export const SelectionControl = {
  CHECKBOX: "CHECKBOX",
  TOGGLE: "TOGGLE",
};

function DashboardSearchFacet(props) {
  const { facetName, setOfSummaryKeyTerms, termGroup } = props;
  const { label, terms } = termGroup;
  const { onOpenModal } = useContext(ContextModal);
  const snippetCount =
    DashboardSearchService.getDashboardCheckboxMaxDisplayCount(
      setOfSummaryKeyTerms
    );
  const moreCount = DashboardSearchService.getDashboardCheckboxMoreCount(
    terms,
    snippetCount
  );
  const snippets = terms.slice(0, snippetCount);
  const selectionControl =
    FacetSelectionControl[label] || SelectionControl.CHECKBOX;
  const DashboardSearchFacetSelectPanel =
    selectionControl === SelectionControl.TOGGLE
      ? DashboardSearchFacetToggleSelect
      : DashboardSearchFacetCheckboxSelect;

  const onShowMore = () => {
    onOpenModal({ facetName: facetName, termGroup: label });
  };

  return (
    <DashboardSearchPanel id={label}>
      <span id="group">
        <span>{FacetSelectorNameDisplay[label]}</span>
      </span>
      <DashboardSearchFacetSelectPanel facet={facetName} terms={snippets} />
      {moreCount > 0 && (
        <DashboardSearchFacetShowMore
          moreCount={moreCount}
          onShowMore={onShowMore}
          toggleSelect={selectionControl === SelectionControl.TOGGLE}
        />
      )}
    </DashboardSearchPanel>
  );
}

export default DashboardSearchFacet;
