/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for dbGaP.
 */

// Core dependencies
const fetch = require("node-fetch");
const path = require("path");

// App dependencies
const { readFile, splitContentToContentRows, writeFile } = require(path.resolve(
  __dirname,
  "./dashboard-file-system.service.js"
));

// Template variables
const fileDBGAPs = "../../db-gap-cache/db-gap-id-accessions.csv";
const studyPath =
  "https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=";

/**
 * Returns the study accession for the specified study id.
 * If no study exists an empty string is returned.
 *
 * @param studyAccessionsById
 * @param studyId
 * @returns {Promise.<*>}
 */
const getStudyAccession = async function getStudyAccession(
  studyAccessionsById,
  studyId
) {
  /* Grab the study accession from studyAccessionsById (built from cache). */
  const studyAccession = studyAccessionsById.get(studyId);

  /* Return the study accession. */
  if (studyAccession) {
    return studyAccession;
  }

  /* Otherwise, fetch the study accession. */
  /* The new study accession will be cached for future use. */
  return await fetchStudyAccession(studyId);
};

/**
 * Returns a map object key-value pair of study id and study accession.
 *
 * @returns {Promise<Map<any, any>>}
 */
const getStudyAccessionsById = async function getStudyAccessionsById() {
  /* Grab the dbGap cache. */
  const rows = await getCacheDBGAP();

  let studyAccessionsById = new Map();

  for (let row of rows) {
    const [studyId, studyAccession] = row.split(",");
    studyAccessionsById.set(studyId, studyAccession);
  }

  return studyAccessionsById;
};

/**
 * Returns the study url for the specified study accession.
 *
 * @param studyAccession
 * @returns {*}
 */
const getStudyUrl = function getStudyUrl(studyAccession) {
  if (studyAccession) {
    return `${studyPath}${studyAccession}`;
  }

  return "";
};

/**
 * Caches the dbGaP id and accession.
 *
 * @param studyId
 * @param studyAccession
 * @returns {Promise.<void>}
 */
async function cacheDBGAP(studyId, studyAccession) {
  if (studyAccession) {
    const content = `${studyId},${studyAccession}\r\n`;
    console.log(`Caching dbGaP for ${studyId}`);

    /* If the file does not exist, it will be created. */
    /* See https://nodejs.org/api/fs.html#fs_file_system_flags {"flag": "as+"}. */
    await writeFile(fileDBGAPs, content, { flag: "as+" });
  }
}

/**
 * Returns the fetched study accession for the specified study id.
 *
 * @param studyId
 * @returns {Promise.<string>}
 */
async function fetchStudyAccession(studyId) {
  /* Return the study id. */
  /* dbGaP will redirect to the latest study accession. */
  /* Site redirects to "https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=". */
  const url = getStudyUrl(studyId);
  const response = await fetch(url);
  const status = response.status;
  const redirected = response.redirected;
  const responseUrl = response.url || "";

  /* Cache and return the study accession, taken from the redirected url. */
  if (redirected && status === 200 && responseUrl.startsWith(studyPath)) {
    const regex = /.*?study_id=/gi;
    const studyAccession = response.url.replace(regex, "");
    await cacheDBGAP(studyId, studyAccession);

    return studyAccession;
  } else {
    console.log(`dbGaP fetch status error ${status} for ${url}`);
  }

  return "";
}

/**
 * Returns the cached study accession for the specified study id.
 *
 * @returns {Promise<string | *>}
 */
async function getCacheDBGAP() {
  /* Grab the dbGaPs from cache. */
  const content = await readFile(fileDBGAPs, "utf8");

  /* Split the file content into rows. */
  return splitContentToContentRows(content);
}

module.exports.getStudyAccession = getStudyAccession;
module.exports.getStudyAccessionsById = getStudyAccessionsById;
module.exports.getStudyUrl = getStudyUrl;
