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
        this.field("accessType");
        this.field("consortium");
        this.field("dataTypes");
        this.field("dbGapId");
        this.field("dbGapIdAccession");
        this.field("diseases");
        this.field("projectId");
        this.field("studyName");
        this.field("workspaceName");

        this.pipeline.remove(lunr.stemmer);
        this.searchPipeline.remove(lunr.stemmer);

        workspaces.forEach(workspace => {

            const accessType = getAccessType(workspace, studies);
            const consortium = getConsortiumName(workspace.consortium);
            const dataTypes = getDataTypes(workspace.dataTypes);
            const dbGapId = getGapId(workspace.dbGapId);
            const dbGapIdAccession = getGapId(workspace.dbGapIdAccession);
            const diseases = getDiseases(studies, workspace.dbGapIdAccession, workspace.consortium);
            const studyName = getStudyName(studies, workspace.dbGapIdAccession);
            const workspaceName = getWorkspaceName(workspace.projectId);

            this.add({
                "access": workspace.access,
                "accessType": accessType,
                "consortium": consortium,
                "dataTypes": dataTypes,
                "dbGapId" : dbGapId,
                "dbGapIdAccession": dbGapIdAccession,
                "diseases": diseases,
                "projectId": workspace.projectId,
                "studyName": studyName,
                "workspaceName": workspaceName
            });
        });
    });

    fs.writeFileSync("static/dashboard-index.json", JSON.stringify(dashboardIndex));
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
 * Return the access type for the specified workspace:
 *
 * - "controlled" for "Controlled Access" when study exists
 * - "open" for "Open Access" when access: "Public"
 * - "consortium" for "Consortium Access" when access: "Private" (and without study)
 *
 * @param workspace
 * @param studies
 * @returns {*}
 */
function getAccessType(workspace, studies) {

    let studyExists = false;

    if ( workspace.dbGapIdAccession ) {

        studyExists = !!findStudy(studies, workspace.dbGapIdAccession);
    }

    /* "researcher" - workspace with a study. */
    if ( studyExists ) {

        return "controlled";
    }

    /* "consortia" - private workspace. */
    if ( workspace.access === "Private" ) {

        return "consortium";
    }

    /* "public" - public workspace. */
    if ( workspace.access === "Public" ) {

        return "open";
    }

    return ""
}

/**
 * Returns the consortium.
 * Allows lunr to index the consortium for the FE consortium display name.
 *
 * @param consortium
 * @returns {string}
 */
function getConsortiumName(consortium) {

    if ( !consortium ) {

        return "";
    }

    /* Handles consortium "1000 genomes". */
    if ( consortium.toLowerCase().includes("1000 genomes") ) {

        return `${consortium} thousand`;
    }

    return consortium;
}

/**
 * Returns the data types as a string joined by a space.
 * Allows lunr to index data type for the FE data type display name
 * as well as the long-hand version of the data type.
 *
 * @param dataTypes
 * @returns {string}
 */
function getDataTypes(dataTypes) {

    if ( !dataTypes ) {

        return "";
    }

    return dataTypes.reduce((acc, dataType) => {

        const type = dataType.toLowerCase();

        acc = `${acc} ${type}`;

        if ( type.includes("wgs") ) {

            acc = `${acc} whole genome`;
        }

        if ( type.includes("wes") ) {

            acc = `${acc} whole exome`;
        }

        if ( type.includes("vcf") ) {

            acc = `${acc} variant call format`
        }

        return acc;
    }, "");
}

/**
 * Returns the study's diseases as a concatenated string value.
 *
 * @param studies
 * @param dbGapIdAccession
 * @param consortium
 * @returns {string}
 */
function getDiseases(studies, dbGapIdAccession, consortium) {

    // We currently don't have a direct mapping between diseases and workspaces. We can assume each study's diseases
    // apply to each workspace in the study, except for CMG (which we leave blank for now). Once we have direct
    // mapping between workspace and diseases, we can update this to use the workspace-specific values, including
    // for CMG.
    if ( consortium.toLowerCase() === "cmg" ) {

        return "";
    }

    const study = findStudy(studies, dbGapIdAccession);

    if ( !study || !study.diseases ) {

        return "";
    }

    return study.diseases.join(" ");
}

/**
 * Returns the db Gap ID with its corresponding number, without the prefix "phs00*".
 *
 * @param gapId
 * @returns {string}
 */
function getGapId(gapId) {

    if ( !gapId ) {

        return gapId;
    }

    const gapNumbers = gapId.split("phs").pop().split("");

    const gapNumber = gapNumbers.reduce((acc, num) => {

        if ( acc.length ) {

            acc.push(num);
        }

        if ( !acc.length && num !== "0" ) {

            acc.push(num);
        }

        return acc;
    }, []).join("");

    return `${gapId} ${gapNumber}`;
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
