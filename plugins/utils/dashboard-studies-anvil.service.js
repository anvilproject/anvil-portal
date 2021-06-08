/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting AnVIL studies into FE model from workspaces data.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {getStudyAccession, getStudyAccessionsById, getStudyUrl} = require(path.resolve(__dirname, "./dashboard-studies-db-gap.service.js"));
const {getFHIRStudy} = require(path.resolve(__dirname, "./dashboard-studies-fhir.service.js"));

/**
 * Returns a map object of key-value pair study accession and study name by db gap id.
 * @param workspaces
 * @returns {Promise.<*>}
 */
const getStudyPropertiesById = async function getStudyPropertiesById(workspaces) {

    /* Grab the set of study ids. */
    const setOfStudyIds = getSetOfStudyIds(workspaces);

    /* Grab the study accessions by study id. */
    const studyAccessionsById = await getStudyAccessionsById();

    /* Build the map object key-value pair of study id and study. */
    let studyByStudyId = new Map();

    for ( let studyId of [...setOfStudyIds] ) {

        /* Grab the study accession from studyAccessionsById, or fetch from dbGap. */
        const studyAccession = await getStudyAccession(studyAccessionsById, studyId);

        /* Continue when the study accession is not available. */
        if ( !studyAccession ) {

            continue;
        }

        /* Assemble general study fields. */
        const study = await getFHIRStudy(studyAccession);
        const studyDesigns = study?.studyDesigns
        const studyName = study?.studyName;
        const studyUrl = getStudyUrl(studyAccession);
        studyByStudyId.set(studyId, {
            dbGapIdAccession: studyAccession,
            studyDesigns: studyDesigns,
            studyName: studyName,
            studyUrl: studyUrl});
    }

    return studyByStudyId;
};

/**
 * Returns the set of dbGaP ids.
 *
 * @param workspaces
 * @returns {Set}
 */
function getSetOfStudyIds(workspaces) {

    return new Set(workspaces
        .filter(workspace => workspace.dbGapId && workspace.dbGapId.startsWith("phs"))
        .map(workspace => workspace.dbGapId));
}

module.exports.getStudyPropertiesById = getStudyPropertiesById;
