/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for AnVIL-specific Google Custom Search Engine functionality.
 */

// App dependencies
import { GCSEParameter } from "./gcse-parameter.model";
import * as EnvironmentService from "../environment/environment.service";

/**
 * Returns the GCSE href for the current environment.
 * @returns GCSE href.
 */
function getGCSEEnvironmentUrl() {
  if (EnvironmentService.isLocal()) {
    return EnvironmentService.getAnVILDevEnvironmentUrl();
  }
  return EnvironmentService.getCurrentEnvironmentURL();
}

/**
 * Returns http request URL for Google Custom Search Engine.
 * @param query
 * @param partner
 * @param start
 * @param searchEngineId
 */
export function getGCSERequestURL(query, partner, start, searchEngineId) {
  const searchQuery = partner ? `${query} more:${partner}` : query;
  const paramGCSEId = `${GCSEParameter.ID}=${searchEngineId}`;
  const paramQuery = `${GCSEParameter.QUERY}=${searchQuery}`;
  const paramSafe = `${GCSEParameter.SAFE}=active`;
  const paramStart = `${GCSEParameter.START}=${start}`;
  const parameters = `${paramGCSEId}&${paramQuery}&${paramSafe}&${paramStart}`;
  const url = getGCSEEnvironmentUrl();
  return `${url}customsearch/v1?${encodeURI(parameters)}`;
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
