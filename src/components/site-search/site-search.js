/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search component.
 */

// Core dependencies
import { useLocation } from "@reach/router";
import React, { useContext, useEffect } from "react";

// App dependencies
import { partitionSearchParams } from "./common/utils";
import ContextSiteSearch from "./context-site-search/context-site-search";
import SiteSearchPagination from "./site-search-pagination/site-search-pagination";
import SiteSearchPartners from "./site-search-partners/site-search-partners";
import SiteSearchProgressIndicator from "./site-search-progress-indicator/site-search-progress-indicator";
import SiteSearchResults from "./site-search-results/site-search-results";

export default function SiteSearch() {
  const {
    onSiteSearchPageRequest,
    nextPage,
    partners,
    previousPage,
    searchPath,
    siteSearch,
    showPagination,
    siteSearchResults,
    onUpdateSiteSearch,
  } = useContext(ContextSiteSearch);
  const { search } = useLocation();
  const { searchError, searchLoading, searchTerms } = siteSearch || {};
  const [query, queryPartner] = partitionSearchParams(search);

  useEffect(() => {
    onUpdateSiteSearch(query, queryPartner);
  }, [onUpdateSiteSearch, query, queryPartner]);

  if (searchLoading) {
    /* Return progress indicator. */
    return (
      <>
        <SiteSearchPartners
          partners={partners}
          searchPath={searchPath}
          searchTerm={query}
          selectedPartner={queryPartner}
        />
        <SiteSearchProgressIndicator />
      </>
    );
  }
  if (searchTerms) {
    if (siteSearchResults) {
      /* Return search results. */
      return (
        <>
          <SiteSearchPartners
            partners={partners}
            searchPath={searchPath}
            searchTerm={query}
            selectedPartner={queryPartner}
          />
          <SiteSearchResults query={searchTerms} results={siteSearchResults} />
          {showPagination ? (
            <SiteSearchPagination
              onSiteSearchPageRequest={onSiteSearchPageRequest}
              nextPage={nextPage}
              previousPage={previousPage}
            />
          ) : null}
        </>
      );
    }
    /* No search results for the search term. */
    return (
      <>
        <SiteSearchPartners
          partners={partners}
          searchPath={searchPath}
          searchTerm={query}
          selectedPartner={queryPartner}
        />
        <p>No results.</p>
      </>
    );
  }
  if (searchError) {
    /* Search error - search term is not defined. */
    return (
      <>
        <SiteSearchPartners
          partners={partners}
          searchPath={searchPath}
          searchTerm={query}
          selectedPartner={queryPartner}
        />
        <p>Please enter a query in the search box.</p>
      </>
    );
  }
  return null;
}
