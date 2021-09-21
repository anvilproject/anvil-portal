/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search input component.
 */

// Core dependencies
import React, { useCallback, useContext, useEffect, useRef } from "react";

// App dependencies
import ContextSiteSearch from "../context-site-search/context-site-search";
import SiteSearchInputClear from "../site-search-input-clear/site-search-input-clear";
import SiteSearchInputIcon from "../site-search-input-icon/site-search-input-icon";

// Styles
import * as compStyles from "./site-search-input.module.css";

function SiteSearchInput() {
  const {
    inputValue,
    onSetInputValue,
    onSetSiteSearchBarOpen,
    searchBarOpen,
  } = useContext(ContextSiteSearch);
  const refInput = useRef(null);
  const showClear = !!inputValue;

  const onHandleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onSetSiteSearchBarOpen(false);
      }
    },
    [onSetSiteSearchBarOpen]
  );

  const onInputBlur = (e) => {
    const { currentTarget, relatedTarget } = e || {},
      { parentNode: formEl } = currentTarget;
    const clearButtonClicked = formEl.contains(relatedTarget);

    if (!clearButtonClicked) {
      onSetSiteSearchBarOpen(false);
    }
  };

  const onInputChange = (e) => {
    const { target } = e || {},
      { value: inputStr } = target || {};

    onSetInputValue(inputStr);
  };

  const onInputClear = () => {
    /* Clear value and maintain <input> focus. */
    onSetInputValue("");
    refInput.current.focus();
  };

  const onInputFocus = () => {
    onSetSiteSearchBarOpen(true);
  };

  /* useEffect - componentDidMount, componentWillUnmount. */
  /* Add & remove event listener - "keydown". */
  useEffect(() => {
    document.addEventListener("keydown", onHandleKeyDown);
    return () => {
      document.removeEventListener("keydown", onHandleKeyDown);
    };
  }, [onHandleKeyDown]);

  /* useEffect - componentDidUpdate - searchBarOpen. */
  /* Blur input if search bar is collapsed. */
  useEffect(() => {
    if (!searchBarOpen) {
      refInput.current.blur();
    } else {
      refInput.current.focus();
    }
  }, [searchBarOpen]);

  return (
    <>
      <SiteSearchInputIcon />
      <input
        className={compStyles.input}
        onBlur={(e) => onInputBlur(e)}
        onChange={(e) => onInputChange(e)}
        onFocus={() => onInputFocus()}
        name={"siteSearch"}
        placeholder={"Search"}
        ref={refInput}
        spellCheck="false"
        type="text"
        value={inputValue}
      />
      <SiteSearchInputClear
        onInputClear={onInputClear}
        searchBarOpen={searchBarOpen}
        showClear={showClear}
      />
    </>
  );
}

export default SiteSearchInput;
