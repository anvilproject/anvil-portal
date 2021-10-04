/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting NCPI dashboard studies into FE model.
 */

// Core dependencies
const path = require("path");

// App dependencies
const { sortDataByDuoTypes } = require(path.resolve(
  __dirname,
  "./dashboard-sort.service.js"
));
const { readNCPISource } = require(path.resolve(
  __dirname,
  "./dashboard-source.service"
));
const { getPlatformStudyIds } = require(path.resolve(
  __dirname,
  "./dashboard-studies-api.service.js"
));
const {
  getStudyAccession,
  getStudyAccessionsById,
  getStudyUrl,
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
const PLATFORM = {
  ANVIL: "AnVIL",
  BDC: "BDC",
  CRDC: "CRDC",
  GMKF: "GMKF",
  KFDRC: "KFDRC",
};
const SOURCE_HEADER_KEY = {
  DB_GAP_ID: "identifier",
  PLATFORM: "platform",
};
const SOURCE_FIELD_KEY = {
  [SOURCE_HEADER_KEY.DB_GAP_ID]: "dbGapId",
  [SOURCE_HEADER_KEY.PLATFORM]: "platform",
};
const SOURCE_FIELD_TYPE = {
  [SOURCE_HEADER_KEY.DB_GAP_ID]: "string",
  [SOURCE_HEADER_KEY.PLATFORM]: "string",
};
const urlBDC =
  "https://gen3.biodatacatalyst.nhlbi.nih.gov/mds/metadata?_guid_type=discovery_metadata&data=false&limit=500";
const urlCRDC =
  "https://api.gdc.cancer.gov/projects?from=0&size=100&sort=project_id:asc&pretty=true";

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
 * Returns the bdc study ids.
 *
 * @param studies
 * @returns {*}
 */
function bdcStudyIdParser(studies) {
  return studies
    .map((studyId) => studyId?.split(".")[0])
    .filter((studyId) => studyId?.startsWith("phs"));
}

/**
 * Returns the crdc study ids.
 *
 * @param studies
 * @returns {*}
 */
function crdcStudyIdParser(studies) {
  const { data } = studies,
    { hits } = data;

  /* Grab a set of study ids. */
  return hits
    ?.map((hit) => hit.dbgap_accession_number)
    .filter((studyId) => studyId);
}

/**
 * Returns the slug for the study detail page.
 *
 * @param studyId
 * @returns {string}
 */
function getDashboardStudySlug(studyId) {
  if (studyId && studyId.startsWith("phs")) {
    return `/ncpi/data/studies/${studyId}`;
  }
  return "";
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
      study = await getFHIRStudy(dbGapId);

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
        studyRequestAccessUrl: getStudyRequestAccessUrl(dbGapId),
        studySlug: getDashboardStudySlug(dbGapId),
        studyUrl: studyUrl,
      });
    }

    /* Grab or build the study platforms. */
    /* Add the platform to an existing study platforms or assemble. */
    const studyPlatforms = getStudyPlatforms(study.platforms, platform);
    const studyPlatform = getStudyPlatform(studyPlatforms);
    Object.assign(study, {
      platform: studyPlatform,
      platforms: studyPlatforms,
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
  /* Read and parse the source file. */
  const rows = await readNCPISource(SOURCE_FIELD_KEY, SOURCE_FIELD_TYPE);

  /* Build a set of row keys comprising of platform and study id. */
  const setOfRowKeys = new Set();

  for (const row of rows) {
    const { dbGapId, platform } = row;
    const rowKey = `${platform}${dbGapId}`;
    setOfRowKeys.add(rowKey);
  }

  /* Grab the current list of CRDC study ids from the NCI api. */
  const crdcPlatformStudyIds = await getPlatformStudyIds(
    urlCRDC,
    PLATFORM.CRDC,
    crdcStudyIdParser,
    setOfRowKeys
  );

  /* Grab the current list of BDC study ids from the api. */
  const bdcPlatformStudyIds = await getPlatformStudyIds(
    urlBDC,
    PLATFORM.BDC,
    bdcStudyIdParser,
    setOfRowKeys
  );

  /* Concatenate all sources of platform study ids. */
  return rows.concat(crdcPlatformStudyIds, bdcPlatformStudyIds);
}

/**
 * Returns the platforms array as a string value; using the platform display value.
 *
 * @param platforms
 */
function getStudyPlatform(platforms) {
  return platforms
    .map((platform) => getStudyPlatformDisplayValue(platform))
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
 * Returns study request access url.
 *
 * @param studyId
 * @returns {string}
 */
function getStudyRequestAccessUrl(studyId) {
  /* Return the request access url with study id as the adddataset parameter. */
  if (studyId) {
    return `https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?adddataset=${studyId}`;
  }
  return "";
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

module.exports.getNCPIStudies = getNCPIStudies;
