/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for AnVIL dashboard field extension.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {buildGapId} = require(path.resolve(__dirname, "./dashboard-study.service.js"));

/**
 * Return the access display text for the specified workspace:
 *
 * - "Controlled Access" when study exists
 * - "Open Access" when access: "Public"
 * - "Consortium Access" when access: "Private" (and without study)
 *
 * @param workspace
 * @param studies
 */
const getFieldTypeWorkspaceAccessType = function getFieldTypeWorkspaceAccessType(workspace, studies) {

    /* Get the workspace dbGapIdAccession, if it exists. */
    const dbGapIdAccession = workspace.dbGapIdAccession;

    /* Find if a study exists for the workspace. */
    let studyExists = false;

    if ( dbGapIdAccession ) {

        studyExists = studies.some(study => study.dbGapIdAccession === dbGapIdAccession);
    }

    if ( studyExists ) {

        return "Controlled Access";
    }

    if ( workspace.access === "Private" ) {

        return "Consortium Access";
    }

    if ( workspace.access === "Public"  ) {

        return "Open Access";
    }

    return "";
};

/**
 * Returns any diseases for the specified workspace.
 *
 * @param workspace
 * @param studies
 * @returns {*}
 */
const getFieldTypeWorkspaceDiseases = function getFieldTypeWorkspaceDiseases(workspace, studies) {

    // We currently don't have a direct mapping between diseases and workspaces. We can assume each study's diseases
    // apply to each workspace in the study, except for CMG (which we leave blank for now). Once we have direct
    // mapping between workspace and diseases, we can update this to use the workspace-specific values, including
    // for CMG.
    const consortium = workspace.consortium;

    if ( consortium.toLowerCase() === "cmg" ) {

        return [];
    }

    /* Get the workspace dbGapIdAccession, if it exists. */
    /* If the dbGapIdAccession does not exist, return empty value. */
    const dbGapIdAccession = workspace.dbGapIdAccession;

    if ( !dbGapIdAccession ) {

        return [];
    }

    /* Find the study, if it exists. */
    /* If the study does not exist, return empty value. */
    const study = studies.find(study => study.dbGapIdAccession === dbGapIdAccession);

    if ( !study ) {

        return [];
    }

    /* Return the study node. */
    return study.diseases;
};

/**
 * Returns a FE compatible model for the field gapId for the specified workspace.
 *
 * @param workspace
 * @param studies
 */
const getFieldTypeWorkspaceGapId = function getFieldTypeWorkspaceGapId(workspace, studies) {

    /* Studies and workspace dbGapIdAccession value exist. */
    /* Return existing study gapId value. */
    if ( workspace.dbGapIdAccession && studies ) {

        /* Find the study and return the corresponding gapId value. */
        const study = studies.find(study => study.dbGapIdAccession === workspace.dbGapIdAccession);

        return study.gapId;
    }

    /* Build and return gapId value from dbGapId. */
    return buildGapId(workspace.dbGapId);
};

/**
 * Returns the study name for the specified workspace.
 *
 * @param workspace
 * @param studies
 * @returns {*}
 */
const getFieldTypeWorkspaceStudyName = function getFieldTypeWorkspaceStudyName(workspace, studies) {

    /* Get the workspace dbGapIdAccession, if it exists. */
    /* If the dbGapIdAccession does not exist, return empty value. */
    const dbGapIdAccession = workspace.dbGapIdAccession;

    if ( !dbGapIdAccession ) {

        return "";
    }

    /* Find the study, if it exists. */
    /* If the study does not exist, return empty value. */
    const study = studies.find(study => study.dbGapIdAccession === dbGapIdAccession);

    if ( !study ) {

        return "";
    }

    /* Return the study node. */
    return study.studyName;
};

module.exports.getFieldTypeWorkspaceAccessType = getFieldTypeWorkspaceAccessType;
module.exports.getFieldTypeWorkspaceDiseases = getFieldTypeWorkspaceDiseases;
module.exports.getFieldTypeWorkspaceGapId = getFieldTypeWorkspaceGapId;
module.exports.getFieldTypeWorkspaceStudyName = getFieldTypeWorkspaceStudyName;
