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

module.exports.getFieldTypeWorkspaceGapId = getFieldTypeWorkspaceGapId;
module.exports.getFieldTypeWorkspaceStudyName = getFieldTypeWorkspaceStudyName;
