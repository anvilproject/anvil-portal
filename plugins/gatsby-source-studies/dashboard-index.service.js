/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for dashboard search indexing.
 */

// App dependencies
const fs = require("fs");
const lunr = require("lunr");

/**
 * Generates the lunr search index for the dashboard workspaces.
 *
 * @param workspaces
 * @param studies
 */
const generateDashboardIndex = function generateDashboardIndex(studies, workspaces) {

    /* Add the workspace to the search index. */
    const dashboardIndex = lunr(function () {

        this.ref("projectId");
        this.field("access");
        this.field("consentShortName");
        this.field("dataTypes");
        this.field("dbGapId");
        this.field("dbGapIdAccession");
        this.field("diseases");
        this.field("program");
        this.field("projectId");
        this.field("studyName");
        this.field("workspaceName");

        workspaces.forEach(workspace => {

            const consentShortName = getConsentShortName(studies, workspace.dbGapIdAccession);
            const dataTypes = getDataTypes(workspace.dataType);
            const diseases = getDiseases(studies, workspace.dbGapIdAccession);
            const program = getProgram(workspace.program);
            const studyName = getStudyName(studies, workspace.dbGapIdAccession);
            const workspaceName = getWorkspaceName(workspace.projectId);

            this.add({
                "access": workspace.access,
                "consentShortName": consentShortName,
                "dataTypes": dataTypes,
                "dbGapId" : workspace.dbGapId,
                "dbGapIdAccession": workspace.dbGapIdAccession,
                "diseases": diseases,
                "program": program,
                "projectId": workspace.projectId,
                "studyName": studyName,
                "workspaceName": workspaceName
            });
        });
    });

    fs.writeFileSync("public/dashboard-index.json", JSON.stringify(dashboardIndex));
};

/**
 * Removes characters of the specified string to be ignored during sort and returns the string converted into lower case.
 *
 * @param str
 * @returns {string}
 */
function convertToSortableValue(str) {

    const strSansNonAlpha = str.replace(/[-{()}/:_']|\s/g, " ").toLowerCase().trim();
    const strSansOpenSquare = strSansNonAlpha.replace(/[/[]/g, " ");

    return strSansOpenSquare.replace(/]/g, " ");
}

/**
 * Returns the consent short names as a string, joined by a space.
 *
 * @param studies
 * @param dbGapIdAccession
 * @returns {string}
 */
function getConsentShortName(studies, dbGapIdAccession) {

    const study = findStudy(studies, dbGapIdAccession);

    if ( !study || !study.consentGroup ) {

        return "";
    }

    return study.consentGroup.consents.reduce((acc, consent) => {

        const consentShortName = consent.consentShortName;

        return acc.concat(" ", consentShortName);
    }, "")
}

/**
 * Returns the data types as a string joined by a space.
 * Allows lunr to index the data type for the FE data type display name
 * as well as the original data type value from the JSON.
 *
 * @param dataType
 * @returns {string}
 */
function getDataTypes(dataType) {

    if ( !dataType ) {

        return "";
    }

    dataType.map(type => type.toLowerCase());

    if ( dataType.includes("whole genome") ) {

        dataType.push("WGS");
    }

    if ( dataType.includes("exome") ) {

        dataType.push("WES");
    }

    return dataType.join(" ");
}

/**
 * Returns the study's diseases as a concatenated string value.
 *
 * @param studies
 * @param dbGapIdAccession
 * @returns {string}
 */
function getDiseases(studies, dbGapIdAccession) {

    const study = findStudy(studies, dbGapIdAccession);

    if ( !study || !study.diseases ) {

        return "";
    }

    return study.diseases.join(" ");
}

/**
 * Returns the program.
 * Allows lunr to index the program for the FE program display name
 * as well as the original program value from the JSON.
 *
 * @param program
 * @returns {string}
 */
function getProgram(program) {

    if ( !program ) {

        return "";
    }

    if ( program.toLowerCase().includes("thousandgenomes") ) {

        return program.concat(" ", "1000").concat(" ", "thousand").concat(" ", "genomes");
    }

    return program;
}

/**
 * Returns the study name without special characters.
 * Allows lunr to index the study name, facilitating partial searches within the study name.
 *
 * @param studies
 * @param dbGapIdAccession
 * @returns {string}
 */
function getStudyName(studies, dbGapIdAccession) {

    const study = findStudy(studies, dbGapIdAccession);

    if ( !study ) {

        return "";
    }

    return convertToSortableValue(study.studyName);
}

/**
 * Returns the projectId (workspace name) without special characters e.g. "_" or "-".
 * Allows lunr to index the projectId facilitating partial searches within the projectId.
 * e.g. a search for "heart" will return the resulting workspace AnVIL_CMG_Broad_Heart_PCGC.
 *
 * @param workspaceName
 */
function getWorkspaceName(workspaceName) {

    return convertToSortableValue(workspaceName);
}

/**
 * Find the study for the specified dbGapIdAccession.
 *
 * @param studies
 * @param dbGapIdAccession
 * @returns {string}
 */
function findStudy(studies, dbGapIdAccession) {

    if ( !studies || !dbGapIdAccession ) {

        return "";
    }

    return studies.find(study => study.dbGapIdAccession === dbGapIdAccession);
}

module.exports.generateDashboardIndex = generateDashboardIndex;
