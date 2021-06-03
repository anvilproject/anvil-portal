/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting NCPI dashboard studies into FE model.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {parseRows, readFile, splitContentToContentRows} = require(path.resolve(__dirname, "./dashboard-file-system.service.js"));
const {sortDataByDuoTypes} = require(path.resolve(__dirname, "./dashboard-sort.service.js"));
const {getStudyAccession, getStudyUrl} = require(path.resolve(__dirname, "./dashboard-studies-db-gap.service.js"));
const {getFHIRStudy} = require(path.resolve(__dirname, "./dashboard-studies-fhir.service.js"));
const {buildGapId} = require(path.resolve(__dirname, "./dashboard-study.service.js"));

// Template variables
const fileSource = "dashboard-source-ncpi.csv";
const PLATFORM = {
    "ANVIL": "AnVIL",
    "BDC": "BDC",
    "CRDC": "CRDC",
    "GMKF": "GMKF",
    "KFDRC": "KFDRC"
};
const SOURCE_HEADER_KEY = {
    "DB_GAP_ID": "identifier",
    "PLATFORM": "platform",
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

    /* Parse the source file. */
    const rows = await parseSource();

    /* Build the studies. */
    const studiesByStudyId = await getStudiesByStudyId(rows);
    const studies = [...studiesByStudyId.values()];

    /* Return the sorted studies. */
    return sortDataByDuoTypes(studies, "platform", "studyName");
};

/**
 * Returns a map object key-value pair of study by study id.
 *
 * @param rows
 * @returns {Promise<Map<any, any>>}
 */
async function getStudiesByStudyId(rows) {

    let studiesByStudyId = new Map();

    for ( let row of rows ) {

        /* Grab the study accession, if it exists. */
        const {dbGapId, platform} = row;
        const studyAccession = await getStudyAccession(dbGapId);

        /* Continue when the study does not have a study accession. */
        if ( !studyAccession ) {

            continue;
        }

        /* Grab or build the study. */
        let study;

        if ( studiesByStudyId.has(dbGapId) ) {

            /* The study already exists in studiesByStudyId. */
            study = studiesByStudyId.get(dbGapId);
        }
        else {

            /* The study does not exist in studiesByStudyId. */
            /* Build the study from FHIR. */
            study = await getFHIRStudy(studyAccession);

            /* Continue when the study is incomplete. */
            if ( !isStudyFieldsComplete(study) ) {

                continue;
            }

            /* Assemble general study fields. */
            const studyUrl = getStudyUrl(studyAccession);
            const studyGapId = buildGapId(dbGapId, studyUrl);
            Object.assign(study, {dbGapIdAccession: studyAccession, gapId: studyGapId, studyUrl: studyUrl});
        }

        /* Grab or build the study platforms. */
        /* Add the platform to an existing study platforms or assemble. */
        const studyPlatforms = getStudyPlatforms(study.platforms, platform);
        const studyPlatform = getStudyPlatform(studyPlatforms);
        Object.assign(study, {platform: studyPlatform, platforms: studyPlatforms});
        studiesByStudyId.set(dbGapId, study);
    }

    return studiesByStudyId;
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

    if ( platform ) {

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

module.exports.getNCPIStudies = getNCPIStudies;
