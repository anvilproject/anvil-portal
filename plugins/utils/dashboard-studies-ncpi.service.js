/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting NCPI dashboard studies into FE model.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {
  parseRows,
  readFile,
  splitContentToContentRows,
  writeFile
} = require(path.resolve(__dirname, "./dashboard-file-system.service.js"));
const { sortDataByDuoTypes } = require(path.resolve(
  __dirname,
  "./dashboard-sort.service.js"
));
const { getCRDCStudyIds } = require(path.resolve(
  __dirname,
  "./dashboard-studies-crdc.service.js"
));
const {
  getStudyAccession,
  getStudyAccessionsById,
  getStudyUrl
} = require(path.resolve(__dirname, "./dashboard-studies-db-gap.service.js"));
const { getFHIRStudy } = require(path.resolve(
  __dirname,
  "./dashboard-studies-fhir.service.js"
));
const { buildGapId } = require(path.resolve(
  __dirname,
  "./dashboard-study.service.js"
));

// Template variables
const fileSource = "dashboard-source-ncpi.csv";
const PLATFORM = {
  ANVIL: "AnVIL",
  BDC: "BDC",
  CRDC: "CRDC",
  GMKF: "GMKF",
  KFDRC: "KFDRC"
};
const SOURCE_HEADER_KEY = {
  DB_GAP_ID: "identifier",
  PLATFORM: "platform"
};
const SOURCE_FIELD_KEY = {
  [SOURCE_HEADER_KEY.DB_GAP_ID]: "dbGapId",
  [SOURCE_HEADER_KEY.PLATFORM]: "platform"
};
const SOURCE_FIELD_TYPE = {
  [SOURCE_HEADER_KEY.DB_GAP_ID]: "string",
  [SOURCE_HEADER_KEY.PLATFORM]: "string"
};

/**
 * Returns the NCPI dashboard studies.
 *
 * @returns {Promise.<void>}
 */
const getNCPIStudies = async function getNCPIStudies() {
  /* Grab the collection of platforms and study ids. */
  const studyIdPlatforms = await getStudyIdPlatforms();

  /* Build the studies. */
  const studiesByStudyId = await getStudiesByStudyId(studyIdPlatforms);
  const studies = [...studiesByStudyId.values()];

  /* Return the sorted studies. */
  return sortDataByDuoTypes(studies, "platform", "studyName");
};

/**
 * Returns a set of study ids, for the specified platform.
 *
 * @param rows
 * @param platform
 * @returns {Set<any>}
 */
function getSetStudyIds(rows, platform) {
  return new Set(
    rows
      .filter(
        row => row[SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.PLATFORM]] === platform
      )
      .map(row => row[SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.DB_GAP_ID]])
  );
}

/**
 * Returns a map object key-value pair of study by study id.
 *
 * @param rows
 * @returns {Promise<Map<any, any>>}
 */
async function getStudiesByStudyId(rows) {
  /* Grab the study accessions by study id. */
  const studyAccessionsById = await getStudyAccessionsById();

  let studiesByStudyId = new Map();

  for (let row of rows) {
    /* Grab the study accession from studyAccessionsById, or fetch from dbGap. */
    const { dbGapId, platform } = row;
    const studyAccession = await getStudyAccession(
      studyAccessionsById,
      dbGapId
    );

    /* Continue when the study does not have a study accession. */
    if (!studyAccession) {
      continue;
    }

    /* Grab or build the study. */
    let study;

    if (studiesByStudyId.has(dbGapId)) {
      /* The study already exists in studiesByStudyId. */
      study = studiesByStudyId.get(dbGapId);
    } else {
      /* The study does not exist in studiesByStudyId. */
      /* Build the study from FHIR. */
      study = await getFHIRStudy(studyAccession);

      /* Continue when the study is incomplete. */
      if (!isStudyFieldsComplete(study)) {
        continue;
      }

      /* Assemble general study fields. */
      const studyUrl = getStudyUrl(studyAccession);
      const studyGapId = buildGapId(dbGapId, studyUrl);
      Object.assign(study, {
        dbGapIdAccession: studyAccession,
        gapId: studyGapId,
        studyUrl: studyUrl
      });
    }

    /* Grab or build the study platforms. */
    /* Add the platform to an existing study platforms or assemble. */
    const studyPlatforms = getStudyPlatforms(study.platforms, platform);
    const studyPlatform = getStudyPlatform(studyPlatforms);
    Object.assign(study, {
      platform: studyPlatform,
      platforms: studyPlatforms
    });
    studiesByStudyId.set(dbGapId, study);
  }

  return studiesByStudyId;
}

/**
 * Returns study ids and corresponding platform from all available sources.
 *
 * @returns {Promise<*[]>}
 */
async function getStudyIdPlatforms() {
  /* Parse the source file. */
  const rows = await parseSource();

  /* Grab the existing set of CRDC study ids. */
  const setOfExistingCRDCStudyIds = getSetStudyIds(rows, PLATFORM.CRDC);

  /* Grab the current list of CRDC study ids from the NCI api. */
  const studyIds = await getCRDCStudyIds();

  /* Merge any new studies. */
  for (let studyId of studyIds) {
    /* Merge any new CRDC study ids with rows. */
    /* Save any new study ids to the NCPI source file. */
    if (!setOfExistingCRDCStudyIds.has(studyId)) {
      const keyStudyId = SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.DB_GAP_ID];
      const keyPlatform = SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.PLATFORM];
      rows.push({ [keyStudyId]: studyId, [keyPlatform]: PLATFORM.CRDC });
      await saveStudyIdPlatform(PLATFORM.CRDC, studyId);
    }
  }

  return rows;
}

/**
 * Returns the platforms array as a string value; using the platform display value.
 *
 * @param platforms
 */
function getStudyPlatform(platforms) {
  return platforms
    .map(platform => getStudyPlatformDisplayValue(platform))
    .join(", ");
}

/**
 * Returns the platform display value.
 *
 * @param platform
 * @returns {*}
 */
function getStudyPlatformDisplayValue(platform) {
  if (platform) {
    const key = platform.toUpperCase();
    const platformDisplayValue = PLATFORM[key];

    return platformDisplayValue || platform;
  }

  return platform;
}

/**
 * Returns a list of platforms for the study.
 *
 * @param studyPlatforms
 * @param platform
 * @returns {*[]}
 */
function getStudyPlatforms(studyPlatforms = [], platform) {
  /* Add platform to the study's platforms. */
  studyPlatforms.push(platform);

  return studyPlatforms;
}

/**
 * Returns true if the study has a valid study name and subjects total.
 *
 * @param study
 * @returns {*}
 */
function isStudyFieldsComplete(study) {
  return study.studyName && study.subjectsTotal;
}

/**
 * Returns the source into an array, shaped by SOURCE_FIELD_KEY.
 *
 * @returns {Promise.<Array>}
 */
async function parseSource() {
  /* Read NCPI platform dbGapId source. */
  const content = await readFile(fileSource, "utf8");

  /* Split the file content into rows. */
  const contentRows = splitContentToContentRows(content);

  /* Parse and return the ingested data. */
  return parseRows(contentRows, ",", SOURCE_FIELD_KEY, SOURCE_FIELD_TYPE);
}

/**
 * Saves the platform and study id.
 *
 * @param platform
 * @param studyId
 * @returns {Promise<void>}
 */
async function saveStudyIdPlatform(platform, studyId) {
  const content = `${platform},${studyId}`;
  console.log(`Saving NCPI study for ${platform}: ${studyId}`);

  /* If the file does not exist, it will be created. */
  /* See https://nodejs.org/api/fs.html#fs_file_system_flags {"flag": "as+"}. */
  await writeFile(fileSource, content, { flag: "as+" });
}

module.exports.getNCPIStudies = getNCPIStudies;
