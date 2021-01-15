/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search results component.
 */

// Core dependencies
import React from "react";

// App dependencies
import SiteSearchResult from "../site-search-result/site-search-result";

function SiteSearchResults(props) {

    const {results} = props;

    return (
        results.map((result, r) => <SiteSearchResult key={r} result={result}/>)
    )
}

export default SiteSearchResults;
