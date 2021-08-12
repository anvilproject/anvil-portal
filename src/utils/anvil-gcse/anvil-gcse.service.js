/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for AnVIL-specific Google Custom Search Engine functionality.
 */

// App dependencies
import { GCSEParameter } from "./gcse-parameter.model";

/**
 * Returns http request URL for Google Custom Search Engine.
 * See https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list.
 *
 * @param query
 * @param partner
 * @param start
 * @param ncpi
 */
export function getGCSERequestURL(query, partner, start, ncpi) {
  const searchEngineId = ncpi
    ? process.env.GATSBY_NCPI_GCSE_CX
    : process.env.GATSBY_GCSE_CX;
  const searchQuery = partner ? `${query} more:${partner}` : query;
  const paramGCSEId = `${GCSEParameter.ID}=${searchEngineId}`;
  const paramGCSEKey = `${GCSEParameter.KEY}=${process.env.GATSBY_GCSE_KEY}`;
  const paramQuery = `${GCSEParameter.QUERY}=${searchQuery}`;
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
  if (requests) {
    return requests.find((request) => request.searchTerms);
  }

  return {};
}
