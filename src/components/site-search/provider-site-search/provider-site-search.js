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
  const { children, ncpi } = props;
  const ncpiSearchConfigs = [
    { active: true, label: "All Results", value: "" },
    { active: false, label: "NCPI Site", value: "ncpi-only" },
    { active: false, label: "AnVIL", value: "AnVIL" },
    { active: false, label: "BDC", value: "bdc" },
    { active: false, label: "CRDC", value: "crdc" },
    { active: false, label: "Kids First", value: "kf" },
  ];
  const anvilSearchConfigs = [
    { active: true, label: "All Results", value: "" },
    { active: false, label: "AnVIL Site", value: "anvil-only" },
    { active: false, label: "Terra", value: "terra-only" },
    { active: false, label: "Gen3", value: "gen3-only" },
    { active: false, label: "Dockstore", value: "dockstore-only" },
    { active: false, label: "Bioconductor", value: "bioconductor-only" },
    { active: false, label: "Galaxy", value: "galaxy-only" },
  ];
  const { onSetMenuOpen } = useContext(ContextAnVILPortal);
  const currentLocation = useLocation();
  const [GCSEResponse, setGCSEResponse] = useState({ GCSEAPI: {} });
  const [inputValue, setInputValue] = useState("");
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [siteSearch, setSiteSearch] = useState({
    searchError: false,
    searchLoading: false,
    searchPage: 1,
    searchPartner: "",
    searchTerms: "",
  });
  const searchConfigs = ncpi ? ncpiSearchConfigs : anvilSearchConfigs;
  const [partners, setPartners] = useState(searchConfigs);
  const { GCSEAPI } = GCSEResponse || {},
    { queries, items: siteSearchResults } = GCSEAPI || {},
    { nextPage, previousPage } = queries || {},
    { request: requests } = queries || {};
  const request = AnVILGCSEService.getGCSERequest(requests),
    { startIndex } = request;
  const { searchLoading, searchPage, searchPartner, searchTerms } =
    siteSearch || {};
  const showPagination = nextPage || previousPage;

  const getSiteSearchURL = (query, partner) => {
    /* Set the search params. */
    const params = new URLSearchParams();
    params.set("q", query);

    /* Set the selected partner params. */
    if (partner) {
      params.set("partner", partner);
    }

    /* Return url with params. */
    return ncpi
      ? `/ncpi/search?${params.toString()}`
      : `/search?${params.toString()}`;
  };

  const updatePartners = (selectedPartner) => {
    /* Update state partners. */
    const newPartners = Array.from(partners).map((partner) => {
      const active = partner.value === selectedPartner;
      return Object.assign(partner, { active: active });
    });

    setPartners(newPartners);
  };

  const onInitInputValue = useCallback(() => {
    /* Grab the current location. */
    const { pathname, search } = currentLocation || {};

    /* Init search input value for search pages. */
    if (pathname === "/search" || pathname === "/ncpi/search") {
      /* Get the search params from the current URL search params. */
      const params = new URLSearchParams(search);
      const query = params.get("q", params);
      const queryPartner = params.get("partner", params) || "";

      /* Update inputValue for <input> text display. */
      /* Update searchTerms with query, and reset all other search props, e.g. set searchLoading to true. */
      if (query) {
        setInputValue(query);
        setSiteSearch((siteSearch) => ({
          ...siteSearch,
          searchError: false,
          searchLoading: true,
          searchPage: 1,
          searchPartner: queryPartner,
          searchTerms: query,
        }));

        /* Update partners. */
        updatePartners(queryPartner);
      }
    }
  }, [currentLocation]);

  const onSelectSiteSearchPartner = useCallback(
    (selectedPartner) => {
      /* Grab the updated url. */
      const href = getSiteSearchURL(searchTerms, selectedPartner);

      /* Add the updated url to the session history stack. */
      window.history.pushState(null, "", href);

      /* Update state site search. */
      setSiteSearch((siteSearch) => ({
        ...siteSearch,
        searchLoading: true,
        searchPage: 1,
        searchPartner: selectedPartner,
      }));

      /* Update partners. */
      updatePartners(selectedPartner);
    },
    [searchTerms]
  );

  const onSetInputValue = useCallback((inputStr) => {
    setInputValue(inputStr);
  }, []);

  const onSetSiteSearchBarOpen = useCallback((open) => {
    setSearchBarOpen(open);
  }, []);

  const onSiteSearchPageRequest = (sign) => {
    const nextIndex = startIndex + sign * 10;

    /* Update start with page request (page 1, 11, 21 etc). */
    setSiteSearch((siteSearch) => ({
      ...siteSearch,
      searchLoading: true,
      searchPage: nextIndex,
    }));
  };

  const onSubmitSiteSearch = useCallback(
    (event) => {
      event.preventDefault();
      const searchStr = event.target.siteSearch.value;

      /* Only submit form if query is valid. */
      if (searchStr) {
        /* Navigate to search page with params. */
        const href = getSiteSearchURL(searchStr, searchPartner);
        navigate(href);

        /* Close search bar. */
        setSearchBarOpen(false);

        /* Close header menu. */
        onSetMenuOpen(false);

        /* Track search */
        /* TODO review tracking. */
        AnvilGTMService.trackSiteSearch(searchStr);
      }
    },
    [onSetMenuOpen, searchPartner]
  );

  /* useEffect - componentDidMount/componentWillUnmount. */
  /* Initialize search value. */
  useEffect(() => {
    onInitInputValue();
  }, [onInitInputValue]);

  /* useEffect - componentDidUpdate - search. */
  /* Fetch GCSE results with any change to searchPage or searchTerms when searchLoading is true. */
  useEffect(() => {
    if (searchLoading && searchTerms) {
      /* Grab the Google Custom SE request URL. */
      const GCSERequestURL = AnVILGCSEService.getGCSERequestURL(
        searchTerms,
        searchPartner,
        searchPage,
        ncpi
      );

      /* Fetch the SE results. */
      fetch(GCSERequestURL)
        .then((res) => res.json())
        .then((res) => {
          setGCSEResponse((GCSEResponse) => ({
            ...GCSEResponse,
            GCSEAPI: res,
          }));
          setSiteSearch((siteSearch) => ({
            ...siteSearch,
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
        setSiteSearch((siteSearch) => ({
          ...siteSearch,
          searchError: true,
          searchLoading: false,
        }));
      }, 1000);

      return () => clearTimeout(delayProgressIndicatorFinish);
    }
  }, [ncpi, searchLoading, searchPage, searchPartner, searchTerms]);

  return (
    <ContextSiteSearch.Provider
      value={{
        inputValue,
        onSelectSiteSearchPartner,
        onSetInputValue,
        onSetSiteSearchBarOpen,
        onSiteSearchPageRequest,
        onSubmitSiteSearch,
        nextPage,
        partners,
        previousPage,
        searchBarOpen,
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
