/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting NCPI dashboard studies into FE model.
 */

// Core dependencies
const fs = require("fs");
const path = require("path");

// App dependencies
const {sortDataByDuoTypes} = require(path.resolve(__dirname, "./dashboard-sort.service.js"));
const {buildConsentCodes, buildGapId, buildXMLStudy, getConsentShortNames, getSubjectConsents} = require(path.resolve(__dirname, "./dashboard-study.service.js"));

// Template variables
const fileNamePlatformByNCPI = "dashboard-plaform-by-ncpi.txt";

/**
 * Returns the NCPI dashboard studies.
 *
 * @returns {Promise.<void>}
 */
const getNCPIStudies = async function getNCPIStudies() {

    /* Grab the dbGapIds and their corresponding platform. */
    const platformByGapIdAccession = await buildPlatformByGapIdAccession();

    /* Build the studies dashboard. */
    const dashboardStudies = await buildNCPIDashboardStudies(platformByGapIdAccession);

    /* Return the sorted studies. */
    return sortDataByDuoTypes(dashboardStudies, "platform", "studyName");
};

/**
 * Build up FE-compatible model of NCPI dashboard studies, to be displayed on the NCPI dashboard.
 *
 * @param platformByGapIdAccession
 * @returns {Promise.<*[]>}
 */
async function buildNCPIDashboardStudies(platformByGapIdAccession) {

    if ( platformByGapIdAccession.size = 0 ) {

        return [];
    }

    /* Build the studies dashboard. */
    return await Promise.all([...platformByGapIdAccession].map(([gapAccession, platform]) => {

        return buildNCPIDashboardStudy(gapAccession, platform);
    }));
}

/**
 * Builds the NCPI dashboard study into a FE-compatible model of a data dashboard study.
 *
 * @param gapAccession
 * @param platform
 * @returns {Promise.<{consentGroup: {consents, consentsStat}, consortium: *, dbGapIdAccession: *, diseases: *, studyName, subjectsCount: *, subjectsTotal}>}
 */
async function buildNCPIDashboardStudy(gapAccession, platform) {

    /* Get the db gap readiness studies and subject report, dictionary queries and study urls. */
    const {studyExchange, subjectDictionary, subjectReport, urls} = await buildXMLStudy(gapAccession);

    /* Assemble the study variables. */
    const consents = getSubjectConsents(subjectReport, subjectDictionary.variableConsentId, studyExchange.consentGroups);
    const consentCodes = buildConsentCodes(consents);
    const consentShortNames = getConsentShortNames(consentCodes);
    const diseases = studyExchange.diseases;
    const gapId = buildGapId(gapAccession, urls.studyUrl);
    const studyPlatform = platform;
    const studyName = studyExchange.name.shortName;
    const subjectsTotal = consents.consentsStat;

    return {
        consentCodes: consentCodes,
        consentShortNames: consentShortNames,
        dbGapIdAccession: gapAccession,
        diseases: diseases,
        gapId: gapId,
        platform: studyPlatform,
        studyName: studyName,
        studyUrl: urls.studyUrl,
        subjectsTotal: subjectsTotal
    };
}

/**
 * Returns a map object key-value pair of platform by dbGapIdAccession.
 * Input text file "dashboard-plaform-by-ncpi.txt" generates the map object.
 * The text file comprises of rows of dbGapIdAccession and corresponding platform values.
 * e.g. phs000160.v1.p1,anvil.
 *
 * @returns {Promise.<*>}
 */
async function buildPlatformByGapIdAccession() {

    /* Only run plugin if the text file exists. */
    if ( fs.existsSync(path.resolve(__dirname, fileNamePlatformByNCPI)) ) {

        const filePath = path.resolve(__dirname, fileNamePlatformByNCPI);
        const fileContent = await fs.readFileSync(filePath, "utf8");

        /* Convert the file content into an array i.e. each string row representing an element. */
        const contentRows = fileContent.toString().split("\n");

        if ( !contentRows ) {

            return new Map();
        }

        /* From each content row, create a map object key-value pair of platform by dbGapIdAccession. */
        return contentRows.reduce((acc, contentRow) => {

            const [dbGapIdAccession, platform] = contentRow.split(",");

            if ( dbGapIdAccession ) {

                acc.set(dbGapIdAccession, platform);
            }

            return acc;
        }, new Map());
    }
    else {

        /* Text file does not exist. */
        console.log("Error: file dashboard-plaform-by-ncpi.csv cannot be found.");

        return new Map();
    }
}

module.exports.getNCPIStudies = getNCPIStudies;
