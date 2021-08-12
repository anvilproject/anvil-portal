/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - a React Context object for AnVIL site search.
 */

// Core dependencies
import React from "react";

// App dependencies
import { Partner } from "../site-search-partner/site-search-partner";

interface SiteSearch {
  searchError: boolean;
  searchLoading: boolean;
  searchPage: number;
  searchPartner: string;
  searchTerms: string;
}

interface SiteSearchContextProps {
  inputValue: string;
  nextPage: object;
  partners: Partner[];
  previousPage: object;
  searchBarOpen: boolean;
  showPagination: boolean;
  siteSearch: SiteSearch;
  siteSearchResults: any[]; // TODO
  onSelectSiteSearchPartner(selectedPartner: string): void;
  onSetInputValue(inputString: string): void;
  onSetSiteSearchBarOpen(expanded: boolean): void;
  onSiteSearchPageRequest(sign: number): void;
  onSubmitSiteSearch(event: Event): void;
}

const ContextSiteSearch = React.createContext<SiteSearchContextProps>({
  inputValue: "",
  nextPage: {},
  partners: [],
  previousPage: {},
  searchBarOpen: false,
  showPagination: false,
  siteSearch: {
    searchError: false,
    searchLoading: true,
    searchPage: 1,
    searchPartner: "",
    searchTerms: "",
  },
  siteSearchResults: [],
  onSelectSiteSearchPartner: () => {},
  onSetInputValue: () => {},
  onSetSiteSearchBarOpen: () => {},
  onSiteSearchPageRequest: () => {},
  onSubmitSiteSearch: () => {},
});

export default ContextSiteSearch;
