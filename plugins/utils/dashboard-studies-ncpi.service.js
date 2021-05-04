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
const {getUrlStudy} = require(path.resolve(__dirname, "./dashboard-studies-db-gap.service.js"));
const {getFHIRStudy} = require(path.resolve(__dirname, "./dashboard-studies-fhir.service.js"));
const {buildGapId} = require(path.resolve(__dirname, "./dashboard-study.service.js"));

// Template variables
const fileSource = "dashboard-source-ncpi.csv";
const PLATFORM = {
    "ANVIL": "AnVIL",
    "BDC": "BDC",
    "GMKF": "GMKF",
    "KFDRC": "KFDRC"
};
const SOURCE_HEADER_KEY = {
    "DB_GAP_ID": "identifier",
    "DB_GAP_ID_ACCESSION": "study accession",
    "PLATFORM": "platform",
};
const SOURCE_FIELD_KEY = {
    [SOURCE_HEADER_KEY.DB_GAP_ID]: "dbGapId",
    [SOURCE_HEADER_KEY.DB_GAP_ID_ACCESSION]: "dbGapIdAccession",
    [SOURCE_HEADER_KEY.PLATFORM]: "platform"
};
const SOURCE_FIELD_TYPE = {
    [SOURCE_HEADER_KEY.DB_GAP_ID]: "string",
    [SOURCE_HEADER_KEY.DB_GAP_ID_ACCESSION]: "string",
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

    /* Make the studies distinct; some platforms share the same study. */
    const studyPlatforms = getDistinctStudies(rows);

    /* Build the studies dashboard. */
    const studies = await buildDashboardStudies(studyPlatforms);

    /* Return the sorted studies. */
    return sortDataByDuoTypes([...studies], "platform", "studyName");
};

/**
 * Build up FE-compatible model of NCPI dashboard studies, to be displayed on the NCPI dashboard.
 *
 * @param gapIdPlatforms
 * @returns {Promise.<*[]>}
 */
async function buildDashboardStudies(gapIdPlatforms) {

    if ( gapIdPlatforms.length ) {

        /* Build the studies dashboard. */
        return await gapIdPlatforms.reduce(async (promise, gapIdPlatform) => {

            let acc = await promise;

            /* Build the study. */
            const study = await buildDashboardStudy(gapIdPlatform);

            /* Accumulate studies with complete fields (title, subjectsTotal). */
            if ( isStudyFieldsComplete(study) ) {

                acc.push(study);
            }

            return acc;
        }, Promise.resolve([]));
    }

    return [];
}

/**
 * Builds the NCPI dashboard study into a FE-compatible model of a data dashboard study.
 *
 * @returns {Promise.<*>}
 * @param gapIdPlatform
 */
async function buildDashboardStudy(gapIdPlatform) {

    const {dbGapIdAccession, platforms} = gapIdPlatform;

    /* Get any study related data from the FHIR JSON. */
    const study = await getFHIRStudy(dbGapIdAccession);

    /* Get the db gap study url. */
    const studyUrl = getUrlStudy(dbGapIdAccession);

    /* Assemble the study variables. */
    const consentCodes = study.consentCodes;
    const dataTypes = study.dataTypes;
    const diseases = study.diseases;
    const gapId = buildGapId(dbGapIdAccession, studyUrl);
    const studyPlatform = getStudyPlatform(platforms);
    const studyPlatforms = platforms;
    const studyName = study.studyName;
    const subjectsTotal = study.subjectsTotal;

    return {
        consentCodes: consentCodes,
        dataTypes: dataTypes,
        dbGapIdAccession: dbGapIdAccession,
        diseases: diseases,
        gapId: gapId,
        platform: studyPlatform,
        platforms: studyPlatforms,
        studyName: studyName,
        studyUrl: studyUrl,
        subjectsTotal: subjectsTotal
    };
}

/**
 * Returns a distinct list of studies, with corresponding list of platforms (should there be more than one per study),
 * and dbGapIds.
 *
 * @param rows
 */
function getDistinctStudies(rows) {

    return rows.reduce((acc, row) => {

        /* Some platforms share the same study. */
        /* In this instance, we will add the additional platform to the existing study. */
        const {dbGapId, dbGapIdAccession} = row;

        if ( dbGapIdAccession ) {

            /* Skip the study, if it has already been accumulated. */
            const studyAccumulated = acc.find(s => s.dbGapIdAccession === dbGapIdAccession);

            if ( studyAccumulated ) {

                return acc;
            }

            /* Grab a set of platforms that share the same study. */
            const setOfPlatforms = rows
                .filter(study => study.dbGapIdAccession === dbGapIdAccession)
                .reduce((acc, study) => {

                    acc.add(study.platform);
                    return acc;
                }, new Set());

            /* Sort the platforms by alpha. */
            const platforms = [...setOfPlatforms];
            platforms.sort();

            /* Accumulate the study. */
            acc.push({dbGapId: dbGapId, dbGapIdAccession: dbGapIdAccession, platforms: platforms});
        }

        return acc;
    }, []);
}

/**
 * Returns the platform display value.
 *
 * @param platform
 * @returns {*}
 */
function getPlatformDisplayValue(platform) {

    if ( platform ) {

        const key = platform.toUpperCase();
        const platformDisplayValue = PLATFORM[key];

        return platformDisplayValue || platform;
    }

    return platform;
}

/**
 * Returns the platforms array as a string value; using the platform display value.
 *
 * @param platforms
 */
function getStudyPlatform(platforms) {

    return platforms
        .map(platform => getPlatformDisplayValue(platform))
        .join(", ");
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
