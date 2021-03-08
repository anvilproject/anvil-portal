/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for dashboard search index fields.
 */

/**
 * Find the study for the specified dbGapIdAccession.
 *
 * @param studies
 * @param dbGapIdAccession
 * @returns {{}}
 */
const findStudy = function findStudy(studies, dbGapIdAccession) {

    if ( studies && dbGapIdAccession ) {

        return studies.find(study => study.dbGapIdAccession === dbGapIdAccession);
    }

    return {};
};

/**
 * Return the access type for the specified workspace.
 * Facilitates the indexing of access type into searchable checkbox values.
 * Indexes the facet "accessType" with unique term values.
 *
 * - "Controlled_Access" for "Controlled Access" when study exists
 * - "Open_Access" for "Open Access" when access: "Public"
 * - "Consortium_Access" for "Consortium Access" when access: "Private" (and without study)
 *
 * @param workspace
 * @param study
 * @returns {*}
 */
const getIndexFieldAccessType = function getIndexFieldAccessType(workspace, study) {

    const studyExits = Object.keys(study).length > 0;

    /* "researcher" - workspace with a study. */
    if ( studyExits ) {

        return "Controlled_Access";
    }

    /* "consortia" - private workspace. */
    if ( workspace.access === "Private" ) {

        return "Consortium_Access";
    }

    /* "public" - public workspace. */
    if ( workspace.access === "Public" ) {

        return "Open_Access";
    }

    return ""
};

/**
 * Returns the study's consent codes as a concatenated string value.
 * Facilitates the indexing of an array of consent codes into searchable checkbox values.
 * Replaces any white space, hyphens with an underscore.
 * e.g. "gru-irb" returns "gru_irb".
 *
 * @param consentShortNames
 * @returns {string}
 */
const getIndexFieldConsentShortNames = function getIndexFieldConsentShortNames(consentShortNames) {

    if ( consentShortNames ) {

        /* Handle case where consent short name is hyphenated "-". */
        return consentShortNames.map(shortName => shortName.replace(/(-|\s)/g, "_")).join(" ");
    }

    return "";
};

/**
 * Returns the consortium.
 * Facilitates the indexing of consortium into a searchable checkbox value.
 * Replaces any white space, commas, hyphens or brackets with an underscore.
 * e.g. "1000 genomes" returns "1000_genomes" and "GTEx (v8)" returns "GTEx__v8_".
 *
 * @param consortium
 * @returns {string}
 */
const getIndexFieldConsortiumName = function getIndexFieldConsortiumName(consortium) {

    if ( consortium ) {

        return consortium.replace(/(,|-|\s|\(|\))/g, "_");
    }

    return "";
};

/**
 * Returns the dataTypes.
 * Facilitates the indexing of an array of data types into a searchable text or checkbox values.
 * Replaces any white space, commas, hyphens or brackets, or slash with an underscore.
 *
 * @param dataTypes
 * @returns {Array}
 */
const getIndexFieldDataTypes = function getIndexFieldDataTypes(dataTypes) {

    if ( dataTypes ) {

        /* Clone data types. */
        const dataTypesClone = Array.from(dataTypes);

        return dataTypesClone.reduce((acc, dataType) => {

            if ( dataType ) {

                const dataTypeSearchStr = dataType.replace(/(\/|,|-|\s|\(|\))/g, "_");

                /* Add dataType to accumulator. */
                acc.push(dataTypeSearchStr);
            }

            return acc;
        }, dataTypesClone);
    }

    return [];
};

/**
 * Returns the study's diseases.
 * Facilitates the indexing of diseases into a searchable text or checkbox value.
 * Replaces any white space, commas, hyphens or brackets or slash with an underscore.
 * e.g. "Hearing Loss, Sensorineural" returns "Hearing_Loss__Sensorineural".
 *
 * @param diseases
 * @param consortium
 * @returns {Array}
 */
const getIndexFieldDiseases = function getIndexFieldDiseases(diseases, consortium = "") {

    // We currently don't have a direct mapping between diseases and workspaces. We can assume each study's diseases
    // apply to each workspace in the study, except for CMG (which we leave blank for now). Once we have direct
    // mapping between workspace and diseases, we can update this to use the workspace-specific values, including
    // for CMG.
    if ( consortium.toLowerCase() === "cmg" ) {

        return [];
    }

    if ( diseases && diseases.length ) {

        /* Clone diseases. */
        const diseasesClone = Array.from(diseases);

        return diseasesClone.reduce((acc, disease) => {

            const diseaseStr = disease.replace(/(\/|,|-|\s|\(|\))/g, "_");
            acc.push(diseaseStr);

            return acc;
        }, diseasesClone);
    }

    return [];
};

/**
 * Returns the GapId and GapId's corresponding number.
 * Indexes GapId's number - strips off any prefix/suffix.
 * e.g. a GapId of "phs001395.v1.p1" returns "1395" and "phs001395.v1.p1".
 *
 * @param gapId
 * @returns {*}
 */
const getIndexFieldGapNumber = function getIndexFieldGapNumber(gapId) {

    if ( gapId ) {

        const gapNumber = gapId.replace(/(^phs0*|\..*$)/g, "");
        return [gapId, gapNumber];
    }

    return [];
};

/**
 * Returns the study name without special characters.
 * Indexes the study name, facilitating partial searches within the study name.
 *
 * @param studyName
 * @returns {string}
 */
const getIndexFieldStudyName = function getIndexFieldStudyName(studyName) {

    if ( studyName ) {

        return convertToSortableValue(studyName);
    }

    return "";
};

/**
 * Returns the projectId (workspace name) without special characters e.g. "_" or "-".
 * Allows lunr to index the projectId facilitating partial searches within the projectId.
 * e.g. a search for "heart" will return the resulting workspace AnVIL_CMG_Broad_Heart_PCGC.
 *
 * @param workspaceName
 */
const getIndexFieldWorkspaceName = function getIndexFieldWorkspaceName(workspaceName) {

    if ( workspaceName ) {

        return convertToSortableValue(workspaceName);
    }

    return "";
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

module.exports.findStudy = findStudy;
module.exports.getIndexFieldAccessType = getIndexFieldAccessType;
module.exports.getIndexFieldConsentShortNames = getIndexFieldConsentShortNames;
module.exports.getIndexFieldConsortiumName = getIndexFieldConsortiumName;
module.exports.getIndexFieldDataTypes = getIndexFieldDataTypes;
module.exports.getIndexFieldDiseases = getIndexFieldDiseases;
module.exports.getIndexFieldGapNumber = getIndexFieldGapNumber;
module.exports.getIndexFieldStudyName = getIndexFieldStudyName;
module.exports.getIndexFieldWorkspaceName = getIndexFieldWorkspaceName;
