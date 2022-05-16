/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search input component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import DashboardSearchPanel from "../dashboard-search-panel/dashboard-search-panel";
import DashboardSearchTermLogicalOperator from "../../../utils/dashboard/dashboard-search-term-logical-operator.model";

// Styles
import * as compStyles from "./dashboard-search-input.module.css";

function DashboardSearchInput() {
  const { inputValue, onHandleClearFacet, onHandleUpdateFacet } =
    useContext(ContextDashboard);
  const delaySearchRef = useRef(0);
  const inputRef = useRef(null);
  const [showClear, setShowClear] = useState(false);
  const classNamesClear = classNames(compStyles.icon, "material-icons-round", {
    [compStyles.active]: showClear,
  });
  const timer = 250;

  const onHandleChange = useCallback(() => {
    /* Clear any previously set timeout. */
    if (delaySearchRef.current) {
      clearTimeout(delaySearchRef.current);
    }

    /* Delay search over entities - improves indexing/search performance. */
    delaySearchRef.current = setTimeout(() => {
      /* Grab the current ref input. */
      const searchText = inputRef.current.value;

      /* Update state showClear. */
      setShowClear(searchText !== "");

      /* Update facet. */
      onHandleUpdateFacet({
        facet: "search",
        logicalOperator: DashboardSearchTermLogicalOperator.AND,
        term: searchText,
      });
    }, timer);
    return () => clearTimeout(delaySearchRef.current);
  }, [onHandleUpdateFacet]);

  const onHandleClearInput = useCallback(() => {
    /* Maintain <input> focus. */
    inputRef.current.focus();

    /* Clear the inputRef value. */
    inputRef.current.value = "";

    /* Update state showClear. */
    setShowClear(false);

    /* Update facet. */
    onHandleClearFacet("search");
  }, [onHandleClearFacet]);

  /* useEffect - componentDidUpdate - inputValue. */
  useEffect(() => {
    /* Update the ref input when inputValue has deviated in value. */
    /* e.g. when any "search" facet terms are cleared. */
    if (inputValue !== inputRef.current.value) {
      /* Update the ref input with the new input value. */
      inputRef.current.value = inputValue;
    }
  }, [inputValue]);

  return (
    <DashboardSearchPanel id={"search"}>
      <span id="facetName-search">Search</span>
      <span className={compStyles.search}>
        <input
          className={compStyles.input}
          placeholder={"e.g. disease, study name, dbGaP Id"}
          ref={inputRef}
          type="text"
          onChange={() => onHandleChange()}
        />
        <span
          className={classNamesClear}
          role="presentation"
          onClick={() => onHandleClearInput()}
          onKeyDown={() => onHandleClearInput()}
        >
          close
        </span>
      </span>
    </DashboardSearchPanel>
  );
}

export default DashboardSearchInput;
