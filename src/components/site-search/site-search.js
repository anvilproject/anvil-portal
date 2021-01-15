/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search component.
 */

// Core dependencies
import {useLocation} from "@reach/router";
import React, {useEffect, useState} from "react";

// App dependencies
import SiteSearchPagination from "./site-search-pagination/site-search-pagination";
import SiteSearchResults from "./site-search-results/site-search-results";
import * as AnVILGCSEService from "../../utils/anvil-gcse/anvil-gcse.service";

function SiteSearch() {

    const location = useLocation();
    const [GCSEResponse, setGCSEResponse] = useState({});
    const [GCSEParams, setGCSEParams] = useState({query: "", start: 1});
    const {query, start} = GCSEParams || {};
    const {queries, items: results} = GCSEResponse || {},
        {nextPage, previousPage} = queries || {},
        {request: requests} = queries || {};
    const request = AnVILGCSEService.getGCSERequest(requests),
        {searchTerms, startIndex} = request;
    const showPagination = nextPage || previousPage;

    /* useEffect - componentDidUpdate - query, start. */
    useEffect(() => {

        if ( query ) {

            /* Grab the Google Custom SE request URL. */
            const GCSERequestURL = AnVILGCSEService.getGCSERequestURL(query, start);

            /* Fetch the SE results. */
            fetch(GCSERequestURL)
                .then(res => res.json())
                .then(res => setGCSEResponse(res))
                .catch(err => {
                    console.log(err, "Error requesting Google Custom SE.");
                });

            window.scrollTo(0, 0);
        }
    }, [query, start]);

    /* useEffect - componentDidUpdate - location. */
    useEffect(() => {

        const {search} = location;
        const [, _query] = search.split("=");

        setGCSEParams(GCSEParams => ({...GCSEParams, query: _query, start: 1}));
    }, [location]);

    return (
            <>
            <h2>for "{searchTerms ? searchTerms : null}"</h2>
            {searchTerms && results ?
                <>
                <SiteSearchResults results={results}/>
                </> :
                <p>"No Results"</p>}
            {showPagination ? <SiteSearchPagination nextPage={nextPage} previousPage={previousPage} setGCSEParams={setGCSEParams} startIndex={startIndex}/> : null}
            </>
    )
}

export default SiteSearch;
