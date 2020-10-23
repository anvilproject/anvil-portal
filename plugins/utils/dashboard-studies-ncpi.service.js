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
const denyListGapId = ["phs001642", "phs001486", "phs001766", "phs000463", "phs000464", "phs000465", "phs000515", "phs000466", "phs000469", "phs000467", "phs000468", "phs000470", "phs000471", "phs001184", "phs000527", "phs000528", "phs001878"]; // Access to publicly available data is available via a different study.
const fileNameDashboardNCPI = "dashboard-ncpi.txt";

/**
 * Returns the NCPI dashboard studies.
 *
 * @returns {Promise.<void>}
 */
const getNCPIStudies = async function getNCPIStudies() {

    /* Grab the dbGapId, accession and the corresponding platform. */
    const gapIdPlatforms = await buildGapIdPlatforms();

    /* Build the studies dashboard. */
    const dashboardStudies = await buildNCPIDashboardStudies(gapIdPlatforms);

    /* Return the sorted studies. */
    return sortDataByDuoTypes(dashboardStudies, "platform", "studyName");
};

/**
 * Build up FE-compatible model of NCPI dashboard studies, to be displayed on the NCPI dashboard.
 *
 * @param gapIdPlatforms
 * @returns {Promise.<*[]>}
 */
async function buildNCPIDashboardStudies(gapIdPlatforms) {

    if ( gapIdPlatforms.length ) {

        /* Build the studies dashboard. */
        return await gapIdPlatforms.reduce(async (promise, gapIdPlatform) => {

            let acc = await promise;
            const study = await buildNCPIDashboardStudy(gapIdPlatform);

            if ( study ) {

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
async function buildNCPIDashboardStudy(gapIdPlatform) {

    const {dbGapIdAccession, platform} = gapIdPlatform;

    /* Get the db gap readiness studies and subject report, dictionary queries and study urls. */
    const {studyExchange, subjectDictionary, subjectReport, urls} = await buildXMLStudy(dbGapIdAccession);

    /* Assemble the study variables. */
    const consents = getSubjectConsents(subjectReport, subjectDictionary.variableConsentId, studyExchange.consentGroups);
    const consentCodes = buildConsentCodes(consents);
    const consentShortNames = getConsentShortNames(consentCodes);
    const diseases = studyExchange.diseases;
    const gapId = buildGapId(dbGapIdAccession, urls.studyUrl);
    const studyPlatform = platform;
    const studyName = studyExchange.name.shortName;
    const subjectsTotal = consents.consentsStat;

    return {
        consentCodes: consentCodes,
        consentShortNames: consentShortNames,
        dbGapIdAccession: dbGapIdAccession,
        diseases: diseases,
        gapId: gapId,
        platform: studyPlatform,
        studyName: studyName,
        studyUrl: urls.studyUrl,
        subjectsTotal: subjectsTotal
    };
}

/**
 * Returns an array of collections comprising of dbGapId, dbGapIdAccession and platform.
 * Input text file "dashboard-ncpi.txt" generates the list.
 * The text file comprises of rows of platform, gapId and accession values.
 * e.g. AnVIL,phs001272,phs001272.v1.p1
 *
 * @returns {Promise.<*>}
 */
async function buildGapIdPlatforms() {

    /* Only run plugin if the text file exists. */
    if ( fs.existsSync(path.resolve(__dirname, fileNameDashboardNCPI)) ) {

        const filePath = path.resolve(__dirname, fileNameDashboardNCPI);
        const fileContent = await fs.readFileSync(filePath, "utf8");

        /* Convert the file content into an array i.e. each string row representing an element. */
        const contentRows = fileContent.toString().split("\n");

        if ( !contentRows ) {

            return new Map();
        }

        /* From each content row, create a map object key-value pair of platform by dbGapId. */
        return contentRows.reduce((acc, contentRow) => {

            const [platform, dbGapId, dbGapIdAccession] = contentRow.split(",");

            if ( dbGapId && dbGapIdAccession && dbGapIdAccession.startsWith("phs")&& !denyListGapId.includes(dbGapId) ) {

                acc.push({dbGapId: dbGapId, dbGapIdAccession: dbGapIdAccession, platform: platform});
            }

            return acc;
        }, []);
    }
    else {

        /* Text file does not exist. */
        console.log("Error: file dashboard-platform-by-gapid.text cannot be found.");

        return [];
    }
}

module.exports.getNCPIStudies = getNCPIStudies;
