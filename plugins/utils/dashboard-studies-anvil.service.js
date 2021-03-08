/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting AnVIL data dashboard studies into FE model.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {sortDataByDuoTypes} = require(path.resolve(__dirname, "./dashboard-sort.service.js"));
const {buildGapId, buildXMLStudy, getSubjectConsents} = require(path.resolve(__dirname, "./dashboard-study.service.js"));

/**
 * Returns the AnVIL dashboard studies.
 *
 * @param workspaces
 * @returns {Promise.<void>}
 */
const getStudies = async function getStudies(workspaces) {

    /* Grab the workspaces that are dbGapId available. */
    const studyWorkspaces = filterProjectsByDBGapReadiness(workspaces);

    /* Build the studies dashboard. */
    const dashboardStudies = await buildDashboardStudies(studyWorkspaces);

    /* Return the sorted studies. */
    return sortDataByDuoTypes(dashboardStudies, "consortium", "studyName");
};

/**
 * Parse the dashboard studies JSON and build up FE-compatible model of data dashboard studies, to be displayed on the dashboard page.
 *
 * @param workspaces
 * @returns {Promise.<*[]>}
 */
async function buildDashboardStudies(workspaces) {

    const setOfAccessions = setOfDbGapAccessions(workspaces);

    /* Build the studies dashboard. */
    return await Promise.all([...setOfAccessions].map(gapAccession => {

        return buildDashboardStudy(gapAccession, workspaces);
    }));
}

/**
 * Builds the dashboard study into a FE-compatible model of a data dashboard study.
 *
 * @param gapAccession
 * @param workspaces
 * @returns {Promise.<{consentGroup: {consents, consentsStat}, consortium: *, dbGapIdAccession: *, diseases: *, studyName, subjectsCount: *, subjectsTotal}>}
 */
async function buildDashboardStudy(gapAccession, workspaces) {

    /* Get the db gap readiness studies and subject report, dictionary queries and study urls. */
    const {studyExchange, subjectDictionary, subjectReport, urls} = await buildXMLStudy(gapAccession);

    /* Filter workspaces specified by gapAccession. */
    const workspacesByStudy = workspaces.filter(workspace => gapAccession.startsWith(workspace.dbGapIdAccession));

    /* Assemble the study variables. */
    const consents = getSubjectConsents(subjectReport, subjectDictionary.variableConsentId, studyExchange.consentGroups);
    const consortium = findFirstWorkspaceNodeByType(workspacesByStudy, "consortium");
    const diseases = studyExchange.diseases;
    const gapId = buildGapId(gapAccession, urls.studyUrl);
    const studyName = studyExchange.name.shortName;
    const subjectsCount = sumSubjectsValues(workspacesByStudy);
    const subjectsTotal = consents.consentsStat;

    return {
        consentGroup: consents,
        consortium: consortium,
        dbGapIdAccession: gapAccession,
        diseases: diseases,
        gapId: gapId,
        studyName: studyName,
        studyUrl: urls.studyUrl,
        subjectsCount: subjectsCount,
        subjectsTotal: subjectsTotal
    };
}

/**
 * Returns a filtered set of workspaces, specified by dbGapId availability.
 * All projects with public data and any projects with accessible dbGapIds are considered as "readiness data".
 *
 * @param workspaces
 * @returns {*}
 */
function filterProjectsByDBGapReadiness(workspaces) {

    return workspaces.filter(workspace => {

        const dbGapExists = !!workspace.dbGapIdAccession;

        if ( workspace.access === "Public" ) {

            return true;
        }

        return dbGapExists;
    });
}

/**
 * Returns the first workspace's specified node value.
 *
 * @param workspacesByStudy
 * @param type
 * @returns {*}
 */
function findFirstWorkspaceNodeByType(workspacesByStudy, type) {

    if ( workspacesByStudy.length ) {

        return workspacesByStudy[0][type];
    }
}

/**
 * Returns the set of dbGaP accessions.
 *
 * @param workspaces
 * @returns {Set}
 */
function setOfDbGapAccessions(workspaces) {

    return new Set(workspaces.filter(workspace => workspace.dbGapIdAccession).map(workspace => workspace.dbGapIdAccession));
}

/**
 * Sum the subjects counts.
 *
 * @param workspacesByStudy
 * @returns {*}
 */
function sumSubjectsValues(workspacesByStudy) {

    return workspacesByStudy.reduce((accum, workspace) => {
        accum += workspace.subjects;
        return accum;
    }, 0);
}

module.exports.getStudies = getStudies;
