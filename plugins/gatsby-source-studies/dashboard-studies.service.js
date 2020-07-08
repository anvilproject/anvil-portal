/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting data dashboard studies into FE model.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {sortDataByDuoTypes, sortDataBySingularType} = require(path.resolve(__dirname, "./dashboard-sort.service.js"));
const {buildDict, buildExchange, buildReport, getXMLUrls} = require(path.resolve(__dirname, "./dashboard-xml.service.js"));

/**
 * Returns the formatted dashboard study for the specified accession.
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
    return sortDataByDuoTypes(dashboardStudies, "consortia", "studyName");
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
 * @returns {Promise.<{access: *, consentGroup: {consents, consentsStat}, consortia: *, dbGapIdAccession: *, diseases, studyName, subjectsCount: *, subjectsTotal, workspaces}>}
 */
async function buildDashboardStudy(gapAccession, workspaces) {

    /* Get the URLs for the accession. */
    const urls = await getXMLUrls(gapAccession);

    /* Get the db gap readiness dashboard details FE-model, and the studies and subject report and dictionary queries. */
    const studyExchange = await buildExchange(urls.gapExchange);
    const subjectReport = await buildReport(urls.report);
    const subjectDictionary = await buildDict(urls.dict);

    /* Filter workspaces specified by gapAccession. */
    const workspacesByStudy = workspaces.filter(workspace => gapAccession.startsWith(workspace.dbGapIdAccession));

    /* Assemble the study variables. */
    const access = findFirstWorkspaceNodeByType(workspacesByStudy, "access");
    const consents = getSubjectConsents(subjectReport, subjectDictionary.variableConsentId, studyExchange.consentGroups);
    const consortia = findFirstWorkspaceNodeByType(workspacesByStudy, "program");
    const diseases = studyExchange.diseases;
    const studyName = studyExchange.name.shortName;
    const subjectsCount = sumSubjectsValues(workspacesByStudy);
    const subjectsTotal = consents.consentsStat;
    const studyWorkspaces = buildStudyWorkspaces(workspacesByStudy);

    return {
        access: access,
        consentGroup: consents,
        consortia: consortia,
        dbGapIdAccession: gapAccession,
        diseases: diseases,
        studyName: studyName,
        subjectsCount: subjectsCount,
        subjectsTotal: subjectsTotal,
        workspaces: studyWorkspaces
    };
}

/**
 * Returns workspaces summarized by its projectId and corresponding counts.
 *
 * @param workspacesByStudy
 */
function buildStudyWorkspaces(workspacesByStudy) {

    if ( workspacesByStudy ) {

        const studyWorkspaces = workspacesByStudy.map(workspace => {

            return {
                dataType: workspace.dataType,
                files: workspace.files,
                samples: workspace.samples,
                size: workspace.sizeTB,
                subjects: workspace.subjects,
                workspaceId: workspace.projectId
            }
        });

        return sortDataBySingularType(studyWorkspaces, "workspaceId")
    }
}

/**
 * Builds the subject consents model.
 *
 * @param variablesByStudy
 * @param studyConsentGroups
 * @returns {{consents, consentsStat}}
 */
function buildSubjectConsents(variablesByStudy, studyConsentGroups) {

    if ( variablesByStudy ) {

        /* Build the consents for the study. */
        const consents = variablesByStudy.consents.map(subjectConsent => {

            const consentCode = subjectConsent.consentCode;

            /* Find the study consent by subject consent code. */
            const studyConsent = studyConsentGroups.find(studyConsentGroup => studyConsentGroup.groupNum === consentCode);

            return {
                consentCode: consentCode,
                consentLongName: studyConsent.longName,
                consentName: subjectConsent.consentName,
                consentShortName: studyConsent.shortName,
                consentStat: subjectConsent.consentStat
            }
        });

        return {
            consents: consents,
            consentsStat: variablesByStudy.consentsStat
        }
    }
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
 * Returns the subject's consents specified by consentId.
 *
 * @param subjectByStudy
 * @param consentId
 * @param studyConsentGroups
 * @returns {{consents, consentsStat}}
 */
function getSubjectConsents(subjectByStudy, consentId, studyConsentGroups) {

    if ( subjectByStudy && subjectByStudy.variables ) {

        const variablesByStudy = subjectByStudy.variables.find(variable => variable && variable.consentsId === consentId);

        /* Build subject consents. */
        return buildSubjectConsents(variablesByStudy, studyConsentGroups);
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
