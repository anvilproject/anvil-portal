/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search facet component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// App dependencies
import DashboardSearchFacetCheckboxSelect from "../dashboard-search-facet-checkbox-select/dashboard-search-facet-checkbox-select";
import DashboardSearchFacetShowMore from "../dashboard-search-facet-show-more/dashboard-search-facet-show-more";
import DashboardSearchFacetToggleSelect from "../dashboard-search-facet-toggle-select/dashboard-search-facet-toggle-select";
import FacetSelectionControl from "../../../utils/dashboard/facet-selection-control.model";
import { FacetGroupTermNameDisplay } from "../../../utils/dashboard/facet-group-term-name-display.model";

// Styles
import {
  facetTermGroup,
  popover as popoverStyle,
  termGroupLabel,
} from "./dashboard-search-facet-term-group.module.css";

// Template variables
export const SelectionControl = {
  CHECKBOX: "CHECKBOX",
  TOGGLE: "TOGGLE",
};

function DashboardSearchFacetTermGroup(props) {
  const { displayCount, facetName, onOpenModal, popover, termGroup } = props;
  const { label, terms } = termGroup;
  const displayableTerms = getDisplayableTerms(terms, displayCount);
  const moreCount = terms.length - displayableTerms.length;
  const termGroupControl =
    FacetSelectionControl[label] || SelectionControl.CHECKBOX;
  const DashboardSearchFacetSelectPanel =
    termGroupControl === SelectionControl.TOGGLE
      ? DashboardSearchFacetToggleSelect
      : DashboardSearchFacetCheckboxSelect;

  const onShowMore = () => {
    onOpenModal({ facetName: facetName, termGroup: termGroup });
  };

  return (
    <span className={classNames(facetTermGroup, { [popoverStyle]: popover })}>
      {facetName !== label && (
        <span className={termGroupLabel}>
          {FacetGroupTermNameDisplay[label]}
        </span>
      )}
      <DashboardSearchFacetSelectPanel
        facet={facetName}
        terms={displayableTerms}
      />
      {!popover && moreCount > 0 && (
        <DashboardSearchFacetShowMore
          moreCount={moreCount}
          onShowMore={onShowMore}
          toggleSelect={termGroupControl === SelectionControl.TOGGLE}
        />
      )}
    </span>
  );
}

/**
 * Returns the displayable terms.
 * @param terms
 * @param displayCount
 * @returns {*}
 */
function getDisplayableTerms(terms, displayCount) {
  if (!displayCount) {
    return terms;
  }
  return terms.slice(0, displayCount);
}

export default DashboardSearchFacetTermGroup;
