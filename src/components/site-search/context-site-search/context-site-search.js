/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - a React Context object for AnVIL site search.
 */

// Core dependencies
import React from "react";

const ContextSiteSearch = React.createContext({
  inputValue: "",
  nextPage: {},
  previousPage: {},
  searchBarOpen: false,
  showPagination: false,
  siteSearch: {
    searchError: false,
    searchLoading: true,
    searchPage: 1,
    searchTerms: ""
  },
  siteSearchResults: {},
  onSetInputValue: () => {},
  onSetSiteSearchBarOpen: () => {},
  onSiteSearchPageRequest: () => {},
  onSubmitSiteSearch: () => {}
});

export default ContextSiteSearch;
