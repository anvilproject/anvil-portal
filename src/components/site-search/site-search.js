/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextSiteSearch from "./context-site-search/context-site-search";
import SiteSearchPagination from "./site-search-pagination/site-search-pagination";
import SiteSearchPartners from "./site-search-partners/site-search-partners";
import SiteSearchProgressIndicator from "./site-search-progress-indicator/site-search-progress-indicator";
import SiteSearchResults from "./site-search-results/site-search-results";

function SiteSearch() {
  const {
      onSiteSearchPageRequest,
      nextPage,
      previousPage,
      siteSearch,
      showPagination,
      siteSearchResults,
    } = useContext(ContextSiteSearch),
    { searchError, searchLoading, searchTerms } = siteSearch || {};

  if (searchLoading) {
    /* Return progress indicator. */
    return (
      <>
        <SiteSearchPartners />
        <SiteSearchProgressIndicator />
      </>
    );
  }
  if (searchTerms) {
    if (siteSearchResults) {
      /* Return search results. */
      return (
        <>
          <SiteSearchPartners />
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
        <SiteSearchPartners />
        <p>No results.</p>
      </>
    );
  }
  if (searchError) {
    /* Search error - search term is not defined. */
    return (
      <>
        <SiteSearchPartners />
        <p>Please enter a query in the search box.</p>
      </>
    );
  }
  return null;
}

export default SiteSearch;
