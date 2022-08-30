/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL provider site search component.
 * Provider for AnVIL site search functionality.
 */

// Core dependencies
import React, { useCallback, useEffect, useState } from "react";

// App dependencies
import ContextSiteSearch from "../context-site-search/context-site-search";
import * as AnVILGCSEService from "../../../utils/anvil-gcse/anvil-gcse.service";

function ProviderSiteSearch({ children, search: searchConfig }) {
  const [GCSEResponse, setGCSEResponse] = useState({ GCSEAPI: {} });
  const [siteSearch, setSiteSearch] = useState({
    searchError: false,
    searchLoading: false,
    searchPage: 1,
    searchPartner: "",
    searchTerms: "",
  });
  const { partners, searchEngineId, searchPath } = searchConfig;
  const { GCSEAPI } = GCSEResponse || {};
  const { queries, items: siteSearchResults } = GCSEAPI || {};
  const { nextPage, previousPage } = queries || {};
  const { request: requests } = queries || {};
  const request = AnVILGCSEService.getGCSERequest(requests);
  const { startIndex } = request;
  const { searchLoading, searchPage, searchPartner, searchTerms } =
    siteSearch || {};
  const showPagination = nextPage || previousPage;

  const onUpdateSiteSearch = useCallback((searchStr, selectedPartner) => {
    /* Update state site search. */
    setSiteSearch((prevSiteSearch) => ({
      ...prevSiteSearch,
      searchLoading: true,
      searchPage: 1,
      searchPartner: selectedPartner,
      searchTerms: searchStr,
    }));
  }, []);

  const onSiteSearchPageRequest = (sign) => {
    const nextIndex = startIndex + sign * 10;

    /* Update start with page request (page 1, 11, 21 etc). */
    setSiteSearch((prevSiteSearch) => ({
      ...prevSiteSearch,
      searchLoading: true,
      searchPage: nextIndex,
    }));
  };

  /* useEffect - componentDidUpdate - search. */
  /* Fetch GCSE results with any change to searchPage or searchTerms when searchLoading is true. */
  useEffect(() => {
    if (searchLoading && searchTerms) {
      /* Grab the Google Custom SE request URL. */
      const GCSERequestURL = AnVILGCSEService.getGCSERequestURL(
        searchTerms,
        searchPartner,
        searchPage,
        searchEngineId
      );

      /* Fetch the SE results. */
      fetch(GCSERequestURL)
        .then((res) => res.json())
        .then((res) => {
          setGCSEResponse((prevGCSEResponse) => ({
            ...prevGCSEResponse,
            GCSEAPI: res,
          }));
          setSiteSearch((prevSiteSearch) => ({
            ...prevSiteSearch,
            searchError: false,
            searchLoading: false,
          }));
        })
        .catch((err) => {
          console.log(err, "Error requesting Google Custom SE.");
        });
    }

    /* End site search progress indicator if searchLoading and undefined searchTerms. */
    if (searchLoading && !searchTerms) {
      const delayProgressIndicatorFinish = setTimeout(() => {
        setSiteSearch((prevSiteSearch) => ({
          ...prevSiteSearch,
          searchError: true,
          searchLoading: false,
        }));
      }, 1000);

      return () => clearTimeout(delayProgressIndicatorFinish);
    }
  }, [searchEngineId, searchLoading, searchPage, searchPartner, searchTerms]);

  return (
    <ContextSiteSearch.Provider
      value={{
        onSiteSearchPageRequest,
        onUpdateSiteSearch,
        nextPage,
        partners,
        previousPage,
        searchPath,
        showPagination,
        siteSearch,
        siteSearchResults,
      }}
    >
      {children}
    </ContextSiteSearch.Provider>
  );
}

export default ProviderSiteSearch;
