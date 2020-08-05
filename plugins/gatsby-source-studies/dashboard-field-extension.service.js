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
 * Returns a FE compatible model for the GapId for the specified workspace.
 *
 * @param workspace
 * @param studies
 * @returns {*}
 */
const getWorkspaceGapId = function getWorkspaceGapId(workspace, studies) {

    /* Get the workspace dbGapIdAccession, if it exists. */
    /* If the dbGapIdAccession does not exist, return dbGapId and empty studyUrl value. */
    const dbGapIdAccession = workspace.dbGapIdAccession;

    if ( !dbGapIdAccession ) {

        return {
            studyUrl: "",
            value: workspace.dbGapId
        };
    }

    /* Find the study, if it exists. */
    /* Return dbGapAccession with the studyUrl, if it exists. */
    const study = studies.find(study => study.dbGapIdAccession === dbGapIdAccession);
    let studyUrl = "";

    if ( study ) {

        studyUrl = study.studyUrl;
    }

    return {
        studyUrl: studyUrl,
        value: workspace.dbGapIdAccession
    }
};

/**
 * Returns the study name for the specified workspace.
 *
 * @param workspace
 * @param studies
 * @returns {*}
 */
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
module.exports.getWorkspaceGapId = getWorkspaceGapId;
module.exports.getWorkspaceStudyName = getWorkspaceStudyName;
