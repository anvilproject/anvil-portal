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

    const {onSetSiteSearchLoading, siteSearchTerms} = useContext(ContextAnVILPortal);
    const location = useLocation();
    const [GCSEResponse, setGCSEResponse] = useState({GCSEAPI: {}, GCSEMounted: false});
    const [GCSEParams, setGCSEParams] = useState({query: "", start: 1});
    const {query, start} = GCSEParams || {};
    const {GCSEAPI, GCSEMounted} = GCSEResponse || {},
        {queries, items: results} = GCSEAPI || {},
        {nextPage, previousPage} = queries || {},
        {request: requests} = queries || {};
    const request = AnVILGCSEService.getGCSERequest(requests),
        {searchTerms, startIndex} = request;
    const showPagination = nextPage || previousPage;

    /* useEffect - componentDidUpdate - GCSEMounted, query, start. */
    useEffect(() => {

        const newGCSERequest = query && GCSEMounted === false;

        if ( newGCSERequest ) {

            /* Grab the Google Custom SE request URL. */
            const GCSERequestURL = AnVILGCSEService.getGCSERequestURL(query, start);

            /* Fetch the SE results. */
            fetch(GCSERequestURL)
                .then(res => res.json())
                .then(res => {

                    setGCSEResponse(GCSEResponse => ({...GCSEResponse, GCSEAPI: res, GCSEMounted: true}));
                    onSetSiteSearchLoading(false);
                })
                .catch(err => {
                    console.log(err, "Error requesting Google Custom SE.");
                });
        }
    }, [GCSEMounted, onSetSiteSearchLoading, query, start]);

    /* useEffect - componentDidUpdate - location. */
    useEffect(() => {

        /* Reset GCSEMounted to false to indicate site search in progress. */
        setGCSEResponse(GCSEResponse => ({...GCSEResponse, GCSEMounted: false}));
        onSetSiteSearchLoading(true);

        setGCSEParams(GCSEParams => ({...GCSEParams, query: siteSearchTerms, start: 1}));
    }, [location, onSetSiteSearchLoading, siteSearchTerms]);

    return (
        GCSEMounted ?
            <>
            {searchTerms && results ?
                <SiteSearchResults results={results}/> :
                <p>No results</p>}
            {showPagination ?
                <SiteSearchPagination nextPage={nextPage}
                                      previousPage={previousPage}
                                      setGCSEParams={setGCSEParams}
                                      setGCSEResponse={setGCSEResponse}
                                      startIndex={startIndex}/> : null}
            </> : <SiteSearchProgressIndicator/>
    )
}

export default SiteSearch;
