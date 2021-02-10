/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextSiteSearch from "./context-site-search/context-site-search";
import SiteSearchPagination from "./site-search-pagination/site-search-pagination";
import SiteSearchProgressIndicator from "./site-search-progress-indicator/site-search-progress-indicator";
import SiteSearchResults from "./site-search-results/site-search-results";

function SiteSearch() {

    const {onSiteSearchPageRequest, nextPage, previousPage, siteSearch, showPagination, siteSearchResults} = useContext(ContextSiteSearch),
        {searchError, searchLoading, searchTerms} = siteSearch || {};

    return (
        searchLoading ? <SiteSearchProgressIndicator/> :
            searchTerms ?
                siteSearchResults ?
                <>
                <SiteSearchResults results={siteSearchResults} query={searchTerms}/>
                {showPagination ?
                    <SiteSearchPagination onSiteSearchPageRequest={onSiteSearchPageRequest}
                                          nextPage={nextPage}
                                          previousPage={previousPage}/> : null}
                </> : <p>No results.</p> :
                searchError ? <p>Please enter a query in the search box.</p> : null
    )
}

export default SiteSearch;
