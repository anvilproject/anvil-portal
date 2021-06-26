/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for fetched CRDC JSON.
 */

// Core dependencies
const fetch = require("node-fetch");

// Template variables
const SOURCE_FIELD_KEY = {
  DB_GAP_ID: "dbgap_accession_number"
};
const urlCRDC =
  "https://api.gdc.cancer.gov/projects?from=0&size=100&sort=project_id:asc&pretty=true";

/**
 * Returns the CRDC study ids from the CRDC JSON.
 *
 * @returns {Promise<void>}
 */
const getCRDCStudyIds = async function getCRDCStudyIds() {
  /* Fetch the CRDC JSON. */
  const crdcJSON = await fetchCRDCJSON();

  /* Return the CRDC study ids. */
  return getStudyIds(crdcJSON);
};

/**
 * Fetches CRDC page specified by URL and returns corresponding raw JSON.
 *
 * @returns {Promise<*|*[]>}
 */
async function fetchCRDCJSON() {
  /* Fetch the CRDC JSON. */
  const response = await fetch(urlCRDC);
  const status = response.status;

  /* Parse the response. */
  if (status === 200) {
    /* Return the JSON. */
    return await response.json();
  } else {
    console.log(`Error fetchCRDCJSON returns fetch error; ${status}`);
    return [];
  }
}

/**
 * Returns the study ids.
 *
 * @param studies
 * @returns {*[]|*}
 */
function getStudyIds(studies) {
  const { data } = studies,
    { hits } = data;

  /* Grab a set of study ids. */
  const setOfStudyIds = new Set(
    hits?.map(hit => hit[SOURCE_FIELD_KEY.DB_GAP_ID]).filter(hit => hit)
  );

  return [...setOfStudyIds];
}

module.exports.getCRDCStudyIds = getCRDCStudyIds;
