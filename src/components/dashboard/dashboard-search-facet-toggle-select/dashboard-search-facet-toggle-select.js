/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search facet toggle select component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React, { Fragment, useContext } from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardSearchTermLogicalOperator from "../../../utils/dashboard/dashboard-search-term-logical-operator.model";

// Styles
import {
  control,
  controlLabel,
  disabled,
  label,
  toggle,
  toggleSelected,
} from "./dashboard-search-facet-toggle-select.module.css";

function DashboardSearchFacetToggleSelect({ facet, terms }) {
  const { onHandleUpdateFacet } = useContext(ContextDashboard);

  const onHandleClick = (
    facet,
    name,
    selected,
    currentLogicalOperator,
    selectedLogicalOperator
  ) => {
    onHandleUpdateFacet({
      facet,
      logicalOperator: selectedLogicalOperator,
      selected: !selected || currentLogicalOperator !== selectedLogicalOperator,
      term: name,
    });
  };

  return (
    <span className={control}>
      {terms.length > 0 && (
        <>
          <span className={controlLabel}>No</span>
          <span className={controlLabel}>Yes</span>
        </>
      )}
      {terms.map(({ count, countless, logicalOperator, name, selected }) => (
        <Fragment key={name}>
          {/* AND NOT button */}
          <button
            className={classNames(
              toggle,
              {
                [toggleSelected]:
                  selected &&
                  logicalOperator === DashboardSearchTermLogicalOperator.NAND,
              },
              { [disabled]: countless === 0 }
            )}
            onClick={() =>
              onHandleClick(
                facet,
                name,
                selected,
                logicalOperator,
                DashboardSearchTermLogicalOperator.NAND
              )
            }
          >
            {countless}
          </button>
          {/* AND button */}
          <button
            className={classNames(
              toggle,
              {
                [toggleSelected]:
                  selected &&
                  logicalOperator === DashboardSearchTermLogicalOperator.AND,
              },
              { [disabled]: count === 0 }
            )}
            onClick={() =>
              onHandleClick(
                facet,
                name,
                selected,
                logicalOperator,
                DashboardSearchTermLogicalOperator.AND
              )
            }
          >
            {count}
          </button>
          {/* label */}
          <span className={classNames(label, { [disabled]: count === 0 })}>
            {name}
          </span>
        </Fragment>
      ))}
    </span>
  );
}

export default DashboardSearchFacetToggleSelect;
