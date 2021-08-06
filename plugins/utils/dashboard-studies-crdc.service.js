/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for fetched CRDC API.
 */

// Core dependencies
const path = require("path");

// App dependencies
const { fetchAPI } = require(path.resolve(
  __dirname,
  "./dashboard-api.service"
));

// Template variables
const SOURCE_FIELD_KEY = {
  DB_GAP_ID: "dbgap_accession_number",
};
const urlCRDC =
  "https://api.gdc.cancer.gov/projects?from=0&size=100&sort=project_id:asc&pretty=true";

/**
 * Returns the CRDC study ids from the CRDC JSON.
 *
 * @param platform
 * @returns {Promise<*[]|*>}
 */
const getCRDCStudyIds = async function getCRDCStudyIds(platform) {
  /* Fetch the CRDC API. */
  const api = await fetchAPI(urlCRDC);

  /* Return the CRDC study ids. */
  return getStudyIds(api, platform);
};

/**
 * Returns the study ids.
 *
 * @param studies
 * @param platform
 * @returns {*[]|*}
 */
function getStudyIds(studies, platform) {
  const { data } = studies,
    { hits } = data;

  /* Grab a set of study ids. */
  const setOfStudyIds = new Set(
    hits
      ?.map((hit) => hit[SOURCE_FIELD_KEY.DB_GAP_ID])
      .filter((studyId) => studyId)
      .map((studyId) => [platform, studyId])
  );

  return [...setOfStudyIds];
}

module.exports.getCRDCStudyIds = getCRDCStudyIds;
