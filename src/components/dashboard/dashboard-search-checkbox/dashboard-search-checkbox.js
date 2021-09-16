/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search checkbox component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React, { useContext } from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";

// Styles
import * as compStyles from "./dashboard-search-checkbox.module.css";

function DashboardSearchCheckbox(props) {
  const { facet, term } = props,
    { count, name, selected } = term;
  const { onHandleUpdateFacet } = useContext(ContextDashboard);
  const disabled = count === 0;

  const onHandleClick = () => {
    onHandleUpdateFacet({ facet: facet, selected: !selected, term: name });
  };

  return (
    <span
      className={classNames(
        { [compStyles.active]: selected },
        compStyles.checkbox,
        { [compStyles.disabled]: disabled }
      )}
      onClick={() => onHandleClick()}
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
  );
}

export default DashboardSearchCheckbox;
