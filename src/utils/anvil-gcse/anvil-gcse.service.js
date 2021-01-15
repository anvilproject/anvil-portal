/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for AnVIL-specific Google Custom Search Engine functionality.
 */

// App dependencies
import {GCSEParameter} from "./gcse-parameter.model";

/**
 * Returns http request URL for Google Custom Search Engine.
 * See https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list.
 *
 * @param query
 * @param start
 */
export function getGCSERequestURL(query, start) {

    const paramGCSEId = `${GCSEParameter.ID}=${process.env.GATSBY_GCSE_CX}`;
    const paramGCSEKey = `${GCSEParameter.KEY}=${process.env.GATSBY_GCSE_KEY}`;
    const paramQuery = `${GCSEParameter.QUERY}=${query}`;
    const paramSafe = `${GCSEParameter.SAFE}=active`;
    const paramStart = `${GCSEParameter.START}=${start}`;
    const parameters = `${paramGCSEKey}&${paramGCSEId}&${paramQuery}&${paramSafe}&${paramStart}`;

    return `https://www.googleapis.com/customsearch/v1?${encodeURI(parameters)}`;
}

/**
 * Returns the GCSE request object.
 *
 * @param requests
 * @returns {{}}
 */
export function getGCSERequest(requests) {

    if ( requests ) {

        return requests.find(request => request.searchTerms);
    }

    return {};
}
