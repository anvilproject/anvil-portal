/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search component.
 */

// Core dependencies
import {useLocation} from "@reach/router";
import React, {useContext, useEffect, useState} from "react";

// App dependencies
import ContextAnVILPortal from "../context-anvil-portal/context-anvil-portal";
import SiteSearchPagination from "./site-search-pagination/site-search-pagination";
import SiteSearchProgressIndicator from "./site-search-progress-indicator/site-search-progress-indicator";
import SiteSearchResults from "./site-search-results/site-search-results";
import * as AnVILGCSEService from "../../utils/anvil-gcse/anvil-gcse.service";

function SiteSearch() {

    const {onSetSiteSearchLoading, siteSearchLoading, siteSearchTerms} = useContext(ContextAnVILPortal);
    const location = useLocation();
    const [GCSEResponse, setGCSEResponse] = useState({GCSEAPI: {}});
    const [GCSEParams, setGCSEParams] = useState({query: "", start: 1});
    const {query, start} = GCSEParams || {};
    const {GCSEAPI} = GCSEResponse || {},
        {queries, items: results} = GCSEAPI || {},
        {nextPage, previousPage} = queries || {},
        {request: requests} = queries || {};
    const request = AnVILGCSEService.getGCSERequest(requests),
        {startIndex} = request;
    const showPagination = nextPage || previousPage;

    /* useEffect - componentDidUpdate - query, siteSearchLoading, start. */
    useEffect(() => {

        /* Query string defined, fetch SE results. */
        if ( query ) {

            /* Grab the Google Custom SE request URL. */
            const GCSERequestURL = AnVILGCSEService.getGCSERequestURL(query, start);

            /* Fetch the SE results. */
            fetch(GCSERequestURL)
                .then(res => res.json())
                .then(res => {

                    setGCSEResponse(GCSEResponse => ({...GCSEResponse, GCSEAPI: res}));
                    onSetSiteSearchLoading(false);
                })
                .catch(err => {
                    console.log(err, "Error requesting Google Custom SE.");
                });
        }

        /* Query string is undefined, end site search progress indicator. */
        if ( !query && siteSearchLoading ) {

            const delayProgressIndicatorFinish = setTimeout(() => {

                onSetSiteSearchLoading(false);
            }, 1000);

            return () => clearTimeout(delayProgressIndicatorFinish);
        }
    }, [onSetSiteSearchLoading, query, siteSearchLoading, start]);

    /* useEffect - componentDidUpdate - location. */
    useEffect(() => {

        /* Indicate site search in progress. */
        onSetSiteSearchLoading(true);

        setGCSEParams(GCSEParams => ({...GCSEParams, query: siteSearchTerms, start: 1}));
    }, [location, onSetSiteSearchLoading, siteSearchTerms]);

    return (
        siteSearchLoading ? <SiteSearchProgressIndicator/> :
            query ?
                results ?
                <>
                <SiteSearchResults results={results} query={query}/>
                {showPagination ?
                    <SiteSearchPagination nextPage={nextPage}
                                          previousPage={previousPage}
                                          setGCSEParams={setGCSEParams}
                                          startIndex={startIndex}/> : null}
                </> : <p>No results.</p> :
                <p>Please enter a query in the search box.</p>
    )
}

export default SiteSearch;
