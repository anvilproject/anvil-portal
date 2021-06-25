/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search input component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";

// Styles
import compStyles from "./dashboard-search-input.module.css";

const classNames = require("classnames");

class DashboardSearchInput extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { inputValue } = this.props;

    return inputValue !== nextProps.inputValue;
  }

  render() {
    const { inputValue, onHandleClearInput, onHandleInput } = this.props;
    const showClear = !!inputValue;
    return (
      <DashboardSearchPanel>
        <span id="group">Search</span>
        <span className={compStyles.search}>
          <input
            className={compStyles.input}
            type="text"
            placeholder={"e.g. disease, study name, dbGaP Id"}
            value={inputValue}
            onChange={e => onHandleInput(e)}
          />
          <span
            className={classNames(compStyles.icon, "material-icons-round", {
              [compStyles.active]: showClear
            })}
            role="presentation"
            onClick={onHandleClearInput}
            onKeyDown={onHandleClearInput}
          >
            close
          </span>
        </span>
      </DashboardSearchPanel>
    );
  }
}

export default () => {
  const { inputValue, onHandleClearInput, onHandleInput } = useContext(
    ContextDashboard
  );

  return (
    <DashboardSearchInput
      inputValue={inputValue}
      onHandleClearInput={onHandleClearInput}
      onHandleInput={e => onHandleInput(e)}
    />
  );
};
