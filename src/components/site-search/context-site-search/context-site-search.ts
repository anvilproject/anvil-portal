/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - a React Context object for AnVIL site search.
 */

// Core dependencies
import React from "react";

// App dependencies
import { Partner } from "../common/entities";

interface SiteSearch {
  searchError: boolean;
  searchLoading: boolean;
  searchPage: number;
  searchPartner: string;
  searchTerms: string;
}

interface SiteSearchContextProps {
  nextPage: object;
  partners: Partner[];
  previousPage: object;
  searchPath: string;
  showPagination: boolean;
  siteSearch: SiteSearch;
  siteSearchResults: any[]; // TODO
  onSiteSearchPageRequest(sign: number): void;

  onUpdateSiteSearch(searchTerm: string, searchPartner: string): void;
}

const ContextSiteSearch = React.createContext<SiteSearchContextProps>({
  nextPage: {},
  partners: [],
  previousPage: {},
  searchPath: "",
  showPagination: false,
  siteSearch: {
    searchError: false,
    searchLoading: true,
    searchPage: 1,
    searchPartner: "",
    searchTerms: "",
  },
  siteSearchResults: [],
  onSiteSearchPageRequest: () => {},
  onUpdateSiteSearch: () => {},
});

export default ContextSiteSearch;
