/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search results component.
 *
 * Props
 * *****
 * - results: the set of search results matching the entered search text
 * - query: the entered search text, required for tracking of click on search results
 */

// Core dependencies
import React from "react";

// App dependencies
import SiteSearchResult from "../site-search-result/site-search-result";

function SiteSearchResults(props) {
  const { results, query } = props;

  return results.map((result, r) => (
    <SiteSearchResult key={r} result={result} query={query} />
  ));
}

export default React.memo(SiteSearchResults);
