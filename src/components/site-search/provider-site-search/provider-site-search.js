/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL provider site search component.
 * Provider for AnVIL site search functionality.
 */

// Core dependencies
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import React, { useCallback, useContext, useEffect, useState } from "react";

// App dependencies
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";
import ContextSiteSearch from "../context-site-search/context-site-search";
import * as AnVILGCSEService from "../../../utils/anvil-gcse/anvil-gcse.service";
import * as AnvilGTMService from "../../../utils/anvil-gtm/anvil-gtm.service";

function ProviderSiteSearch(props) {
  const { children } = props;
  const { onSetMenuOpen } = useContext(ContextAnVILPortal);
  const currentLocation = useLocation();
  const [GCSEResponse, setGCSEResponse] = useState({ GCSEAPI: {} });
  const [inputValue, setInputValue] = useState("");
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [siteSearch, setSiteSearch] = useState({
    searchError: false,
    searchLoading: false,
    searchPage: 1,
    searchTerms: ""
  });
  const { GCSEAPI } = GCSEResponse || {},
    { queries, items: siteSearchResults } = GCSEAPI || {},
    { nextPage, previousPage } = queries || {},
    { request: requests } = queries || {};
  const request = AnVILGCSEService.getGCSERequest(requests),
    { startIndex } = request;
  const { searchLoading, searchPage, searchTerms } = siteSearch || {};
  const showPagination = nextPage || previousPage;

  const onInitializeInputValue = useCallback(() => {
    const { search } = currentLocation || {};

    /* Get the search params from the current URL search params. */
    const params = new URLSearchParams(search);
    const query = params.get("q", params);

    /* Update inputValue for <input> text display. */
    /* Update searchTerms with query, and reset all other search props, e.g. set searchLoading to true. */
    if (query) {
      setInputValue(query);
      setSiteSearch(siteSearch => ({
        ...siteSearch,
        searchError: false,
        searchLoading: true,
        searchPage: 1,
        searchTerms: query
      }));
    }
  }, [currentLocation]);

  const onSetInputValue = useCallback(inputStr => {
    setInputValue(inputValue => inputStr);
  }, []);

  const onSetSiteSearchBarOpen = useCallback(open => {
    setSearchBarOpen(searchBarOpen => open);
  }, []);

  const onSiteSearchPageRequest = sign => {
    const nextIndex = startIndex + sign * 10;

    /* Update start with page request (page 1, 11, 21 etc). */
    setSiteSearch(siteSearch => ({
      ...siteSearch,
      searchLoading: true,
      searchPage: nextIndex
    }));
  };

  const onSubmitSiteSearch = useCallback(
    event => {
      event.preventDefault();
      const searchStr = event.target.siteSearch.value;

      /* Only submit form if query is valid. */
      if (searchStr) {
        /* Set the search params. */
        const params = new URLSearchParams();
        params.set("q", searchStr);

        /* Navigate with params. */
        navigate(`/search?${params.toString()}`);

        /* Close search bar. */
        setSearchBarOpen(false);

        /* Close header menu. */
        onSetMenuOpen(false);

        /* Track search */
        AnvilGTMService.trackSiteSearch(searchStr);
      }
    },
    [onSetMenuOpen]
  );

  useEffect(() => {
    const { pathname } = currentLocation;

    if (pathname === "/search") {
      setSiteSearch(siteSearch => ({ ...siteSearch, searchLoading: true }));
    }
  }, [currentLocation]);

  /* useEffect - componentDidMount/componentWillUnmount. */
  /* Initialize search value. */
  useEffect(() => {
    onInitializeInputValue();
  }, [onInitializeInputValue]);

  /* useEffect - componentDidUpdate - search. */
  /* Fetch GCSE results with any change to searchPage or searchTerms when searchLoading is true. */
  useEffect(() => {
    if (searchLoading && searchTerms) {
      /* Grab the Google Custom SE request URL. */
      const GCSERequestURL = AnVILGCSEService.getGCSERequestURL(
        searchTerms,
        searchPage
      );

      /* Fetch the SE results. */
      fetch(GCSERequestURL)
        .then(res => res.json())
        .then(res => {
          setGCSEResponse(GCSEResponse => ({ ...GCSEResponse, GCSEAPI: res }));
          setSiteSearch(siteSearch => ({
            ...siteSearch,
            searchError: false,
            searchLoading: false
          }));
        })
        .catch(err => {
          console.log(err, "Error requesting Google Custom SE.");
        });
    }

    /* End site search progress indicator if searchLoading and undefined searchTerms. */
    if (searchLoading && !searchTerms) {
      const delayProgressIndicatorFinish = setTimeout(() => {
        setSiteSearch(siteSearch => ({
          ...siteSearch,
          searchError: true,
          searchLoading: false
        }));
      }, 1000);

      return () => clearTimeout(delayProgressIndicatorFinish);
    }
  }, [searchLoading, searchPage, searchTerms]);

  return (
    <ContextSiteSearch.Provider
      value={{
        inputValue,
        onSetInputValue,
        onSetSiteSearchBarOpen,
        onSiteSearchPageRequest,
        onSubmitSiteSearch,
        nextPage,
        previousPage,
        searchBarOpen,
        showPagination,
        siteSearch,
        siteSearchResults
      }}
    >
      {children}
    </ContextSiteSearch.Provider>
  );
}

export default ProviderSiteSearch;
