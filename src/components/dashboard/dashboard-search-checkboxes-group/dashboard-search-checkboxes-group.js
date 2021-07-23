/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard checkboxes group component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import DashboardSearchCheckbox from "../dashboard-search-checkbox/dashboard-search-checkbox";
import DashboardSearchCheckboxesShowMore from "../dashboard-search-checkboxes-show-more/dashboard-search-checkboxes-show-more";
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";
import ContextModal from "../../modal/context-modal/context-modal";
import * as DashboardSearchService from "../../../utils/dashboard/dashboard-search.service";
import { FacetSelectorNameDisplay } from "../../../utils/dashboard/facet-selector-name-display.model";

function DashboardSearchCheckboxesGroup(props) {
  const { countLabel, facet, setOfSummaryKeyTerms } = props,
    { name, terms } = facet || {};
  const { onOpenModal } = useContext(ContextModal);
  const snippetCount = DashboardSearchService.getDashboardCheckboxMaxDisplayCount(
    setOfSummaryKeyTerms
  );
  const moreCount = DashboardSearchService.getDashboardCheckboxMoreCount(
    terms,
    snippetCount
  );
  const snippets = terms.slice(0, snippetCount);

  const onShowMore = () => {
    onOpenModal({ facetName: name });
  };

  return (
    <DashboardSearchPanel>
      <span id="group">
        <span>{FacetSelectorNameDisplay[name]}</span>
        <span>{countLabel}</span>
      </span>
      {snippets.map((term, t) => (
        <DashboardSearchCheckbox key={t} facet={name} term={term} />
      ))}
      <DashboardSearchCheckboxesShowMore
        moreCount={moreCount}
        onShowMore={onShowMore}
      />
    </DashboardSearchPanel>
  );
}

export default DashboardSearchCheckboxesGroup;
