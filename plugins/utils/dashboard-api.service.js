/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for AnVIL dashboard api.
 */

// Core dependencies
const fetch = require("node-fetch");

/**
 * Fetches API specified by URL and returns corresponding raw JSON.
 *
 * @returns {Promise<*|*[]>}
 */
const fetchAPI = async function fetchAPI(url) {
  /* Fetch the API. */
  const response = await fetch(url);
  const status = response.status;

  /* Parse the response. */
  if (status === 200) {
    /* Return the JSON. */
    return await response.json();
  } else {
    console.log(`Error returns fetch error; ${status}`);
    return [];
  }
};

module.exports.fetchAPI = fetchAPI;
