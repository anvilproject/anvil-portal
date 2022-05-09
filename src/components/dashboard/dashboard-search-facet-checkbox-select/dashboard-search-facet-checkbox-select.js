/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search facet checkbox select component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React, { useContext } from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardSearchTermLogicalOperator from "../../../utils/dashboard/dashboard-search-term-logical-operator.model";

// Styles
import * as compStyles from "./dashboard-search-facet-checkbox-select.module.css";

function DashboardSearchFacetCheckboxSelect(props) {
  const { facet, terms } = props;
  const { onHandleUpdateFacet } = useContext(ContextDashboard);

  const onHandleClick = (facet, name, selected, logicalOperator) => {
    onHandleUpdateFacet({
      facet,
      logicalOperator,
      selected: !selected,
      term: name,
    });
  };

  return terms.map(({ count, name, selected }) => (
    <span
      className={classNames(
        { [compStyles.active]: selected },
        compStyles.checkbox,
        { [compStyles.disabled]: count === 0 }
      )}
      key={name}
      onClick={() =>
        onHandleClick(
          facet,
          name,
          selected,
          DashboardSearchTermLogicalOperator.OR
        )
      }
      role="presentation"
    >
      <span className={compStyles.check}>
        <span className={classNames("material-icons-round", compStyles.icon)}>
          done
        </span>
      </span>
      <span className={compStyles.label}>{name}</span>
      <span className={compStyles.count}>{count}</span>
    </span>
  ));
}

export default DashboardSearchFacetCheckboxSelect;
