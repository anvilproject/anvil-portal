/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for dashboard field extension.
 */

/**
 * Return the access display text for the specified workspace:
 *
 * - "Researcher" when study exists
 * - "Public" when access: "Public"
 * - "Consortia" when access: "Private" (and without study)
 *
 * @param workspace
 * @param studies
 */
const getWorkspaceAccessUI = function getWorkspaceAccessUI(workspace, studies) {

    /* Get the workspace dbGapIdAccession, if it exists. */
    const dbGapIdAccession = workspace.dbGapIdAccession;

    /* Find if a study exists for the workspace. */
    let studyExists = false;

    if ( dbGapIdAccession ) {

        studyExists = !!studies.find(study => study.dbGapIdAccession === dbGapIdAccession);
    }

    if ( studyExists ) {

        return "Researcher";
    }

    if ( workspace.access === "Private" ) {

        return "Consortia";
    }

    if ( workspace.access === "Public"  ) {

        return workspace.access;
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
const getWorkspaceDiseases = function getWorkspaceDiseases(workspace, studies) {

    // We currently don't have a direct mapping between diseases and workspaces. We can assume each study's diseases
    // apply to each workspace in the study, except for CMG (which we leave blank for now). Once we have direct
    // mapping between workspace and diseases, we can update this to use the workspace-specific values, including
    // for CMG.
    const consortia = workspace.program;

    if ( consortia.toLowerCase() === "cmg" ) {

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

const getWorkspaceStudyName = function getWorkspaceStudyName(workspace, studies) {

    /* Get the workspace dbGapIdAccession, if it exists. */
    /* If the dbGapIdAccession does not exist, return empty value. */
    const dbGapIdAccession = workspace.dbGapIdAccession;

    if ( !dbGapIdAccession ) {

        return "";
    }

    /* Find the study, if it exists. */
    /* If the study does not exist, return empty value. */
    const study = studies.find(study => study.dbGapIdAccession === dbGapIdAccession);

    /* Return the study node. */
    return study.studyName;
};

module.exports.getWorkspaceAccessUI = getWorkspaceAccessUI;
module.exports.getWorkspaceDiseases = getWorkspaceDiseases;
module.exports.getWorkspaceStudyName = getWorkspaceStudyName;
