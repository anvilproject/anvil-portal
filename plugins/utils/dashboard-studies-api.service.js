/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for fetched study API.
 */

// Core dependencies
const fetch = require("node-fetch");
const path = require("path");

// App dependencies
const { writeNCPISource } = require(path.resolve(
  __dirname,
  "./dashboard-source.service.js"
));

/**
 * Returns the study ids from the study API.
 *
 * @param url
 * @param platform
 * @param studyIdParser
 * @param setOfRowKeys
 * @returns {Promise<*[]|*>}
 */
const getPlatformStudyIds = async function getPlatformStudyIds(
  url,
  platform,
  studyIdParser,
  setOfRowKeys
) {
  /* Fetch the API. */
  const api = await fetchAPI(url);

  /* Grab the study ids. */
  const studyIds = studyIdParser(api);

  /* Filter for any new study ids. */
  const filteredStudyIds = studyIds.filter((studyId) => {
    const rowKey = `${platform}${studyId}`;
    return !setOfRowKeys.has(rowKey);
  });

  /* Save any new study ids to the NCPI source file. */
  for (const studyId of filteredStudyIds) {
    await writeNCPISource(platform, studyId);
  }

  /* Return the platform study ids. */
  return filteredStudyIds.map((studyId) => {
    return { dbGapId: studyId, platform: platform };
  });
};

/**
 * Fetches API specified by URL and returns corresponding raw JSON.
 *
 * @returns {Promise<*|*[]>}
 */
async function fetchAPI(url) {
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
}

module.exports.getPlatformStudyIds = getPlatformStudyIds;
