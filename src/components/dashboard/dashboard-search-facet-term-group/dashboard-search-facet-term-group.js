/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search facet term group component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// App dependencies
import DashboardSearchFacetCheckboxSelect from "../dashboard-search-facet-checkbox-select/dashboard-search-facet-checkbox-select";
import DashboardSearchFacetShowMore from "../dashboard-search-facet-show-more/dashboard-search-facet-show-more";
import DashboardSearchFacetToggleSelect from "../dashboard-search-facet-toggle-select/dashboard-search-facet-toggle-select";
import { FacetGroupTermNameDisplay } from "../../../utils/dashboard/facet-group-term-name-display.model";
import { FacetGroupTermNoTermsDisplay } from "../../../utils/dashboard/facet-group-term-no-terms-display.model";
import FacetSelectionControl from "../../../utils/dashboard/facet-selection-control.model";

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

function DashboardSearchFacetTermGroup({
  displayCount,
  facetName,
  onOpenModal,
  popover,
  termGroup,
}) {
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
    onOpenModal({ facetName, termGroupName: label });
  };

  return (
    <span className={classNames(facetTermGroup, { [popoverStyle]: popover })}>
      {facetName !== label && (
        <span className={termGroupLabel}>
          {FacetGroupTermNameDisplay[label]}
        </span>
      )}
      {displayableTerms.length > 0 ? (
        <DashboardSearchFacetSelectPanel
          facetName={facetName}
          terms={displayableTerms}
        />
      ) : (
        <span>{FacetGroupTermNoTermsDisplay[label] || "None"}</span>
      )}
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

export default DashboardSearchFacetTermGroup;
