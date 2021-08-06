/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for fetched BDC API.
 */

// Core dependencies
const path = require("path");

// App dependencies
const { fetchAPI } = require(path.resolve(
  __dirname,
  "./dashboard-api.service"
));

// Template variables
const urlBDC =
  "https://gen3.biodatacatalyst.nhlbi.nih.gov/mds/metadata?_guid_type=discovery_metadata&data=false&limit=500";

/**
 * Returns the BDC studies from the BDC JSON.
 *
 * @param platform
 * @returns {Promise<*[]|*>}
 */
const getBDCStudyIds = async function getBDCStudyIds(platform) {
  /* Fetch the BDC API. */
  const api = await fetchAPI(urlBDC);

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
  /* Returns only the study ids from db gap. */
  return studies
    .map((studyId) => studyId?.split(".")[0])
    .filter((studyId) => studyId?.startsWith("phs"))
    .map((studyId) => [platform, studyId]);
}

module.exports.getBDCStudyIds = getBDCStudyIds;
