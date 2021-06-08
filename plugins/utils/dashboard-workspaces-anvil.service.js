/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for AnVIL dashboard workspaces data ingestion.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {parseRows, readFile, splitContentToContentRows} = require(path.resolve(__dirname, "./dashboard-file-system.service.js"));
const {sortDataByDuoTypes} = require(path.resolve(__dirname, "./dashboard-sort.service.js"));
const {getStudyPropertiesById} = require(path.resolve(__dirname, "./dashboard-studies-anvil.service.js"));
const {buildGapId} = require(path.resolve(__dirname, "./dashboard-study.service.js"));

// Template variables
const DENY_LIST_TERMS = ["ATTRIBUTEVALUE", "N/A", "NA", "", null];
const fileSourceAnVIL = "dashboard-source-anvil.tsv";
const fileSourceTerra = "dashboard-source-terra.tsv";
const SOURCE_HEADER_KEY = {
    "CONSENT_SHORT_NAME": "library:datauserestriction",
    "CONSORTIUM": "consortium",
    "DATA_TYPES": "library:datatype.items",
    "DB_GAP_ID": "study_accession",
    "DISEASES": "library:indication",
    "PROJECT_ID": "name",
    "SAMPLES": "sample count",
    "SIZE": "file size",
    "STUDY_DESIGNS": "library:studydesign",
    "SUBJECTS": "library:numsubjects",
    "WORKSPACE": "workspace"
};
const SOURCE_FIELD_KEY = {
    "ACCESS_TYPE": "accessType",
    [SOURCE_HEADER_KEY.CONSENT_SHORT_NAME]: "consentShortName",
    [SOURCE_HEADER_KEY.CONSORTIUM]: "consortium",
    [SOURCE_HEADER_KEY.DATA_TYPES]: "dataTypes",
    [SOURCE_HEADER_KEY.DB_GAP_ID]: "dbGapId",
    "DB_GAP_ID_ACCESSION": "dbGapIdAccession",
    [SOURCE_HEADER_KEY.DISEASES]: "diseases",
    "GAP_ID": "gapId",
    [SOURCE_HEADER_KEY.PROJECT_ID]: "projectId",
    [SOURCE_HEADER_KEY.SAMPLES]: "samples",
    [SOURCE_HEADER_KEY.SIZE]: "size",
    [SOURCE_HEADER_KEY.STUDY_DESIGNS]: "studyDesigns",
    [SOURCE_HEADER_KEY.SUBJECTS]: "subjects",
    [SOURCE_HEADER_KEY.WORKSPACE]: "projectId"
};
const SOURCE_FIELD_TYPE = {
    [SOURCE_HEADER_KEY.CONSENT_SHORT_NAME]: "string",
    [SOURCE_HEADER_KEY.CONSORTIUM]: "string",
    [SOURCE_HEADER_KEY.DATA_TYPES]: "array",
    [SOURCE_HEADER_KEY.DB_GAP_ID]: "string",
    [SOURCE_HEADER_KEY.DISEASES]: "array",
    [SOURCE_HEADER_KEY.PROJECT_ID]: "string",
    [SOURCE_HEADER_KEY.SAMPLES]: "number",
    [SOURCE_HEADER_KEY.SIZE]: "number",
    [SOURCE_HEADER_KEY.STUDY_DESIGNS]: "array",
    [SOURCE_HEADER_KEY.SUBJECTS]: "number",
    [SOURCE_HEADER_KEY.WORKSPACE]: "string"
};
const WORKSPACE_ACCESS_TYPE = {
    "CONSORTIUM_ACCESS": "Consortium Access",
    "CONTROLLED_ACCESS": "Controlled Access",
    "OPEN_ACCESS": "Open Access",
};
const WORKSPACE_CONSORTIUM = {
    "CCDG": "CCDG",
    "CONVERGENT_NEURO": "Convergent Neuro",
    "CMG": "CMG",
    "EMERGE": "eMERGE",
    "GTEX": "GTEx (v8)",
    "HPRC": "HPRC",
    "NHGRI": "NHGRI",
    "PAGE": "PAGE",
    "THOUSANDGENOMES": "1000 Genomes",
    "WGSPD1": "WGSPD1",
    "1000G": "1000 Genomes"
};

/**
 * Returns the AnVIL workspaces from ingested data.
 *
 * @returns {Promise.<void>}
 */
const getWorkspaces = async function getWorkspaces() {

    /* Build workspace counts. */
    const countWorkspaces = await parseSource(fileSourceTerra);

    /* Build the workspace attributes. */
    const attributeWorkspaces = await parseSource(fileSourceAnVIL);

    /* Create a map object key-value pair of study accession by study id. */
    const studyPropertiesById = await getStudyPropertiesById(attributeWorkspaces);

    /* Merge the workspace data and build any additional rule based data, and associated study properties. */
    const workspaces = buildWorkspaces(attributeWorkspaces, countWorkspaces, studyPropertiesById);

    /* Return the sorted dashboard, sorted first by consortium, then by project name. */
    const keyConsortium = SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.CONSORTIUM];
    const keyProjectId = SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.PROJECT_ID];

    return sortDataByDuoTypes(workspaces, keyConsortium, keyProjectId);
};

/**
 * Returns the access type for the specified workspace.
 * - "Consortium Access" for any workspace without a study.
 * - "Controlled Access" for any workspace with a study.
 * - "Open Access" for any workspace defined as open access in library:dataUseRestriction.
 *
 * @param workspace
 * @param studyAccession
 * @returns {{}}
 */
function buildWorkspacePropertyAccessType(workspace, studyAccession) {

    const keyAccessType = SOURCE_FIELD_KEY.ACCESS_TYPE;

    /* Let access type be "Consortium Access". This is true for any workspace that does not have a study, or is not "Open Access". */
    let accessType = WORKSPACE_ACCESS_TYPE.CONSORTIUM_ACCESS;

    /* Let access type be "Controlled Access". This is true for any workspace that has a study, or is not "Open Access". */
    if ( studyAccession ) {

        accessType = WORKSPACE_ACCESS_TYPE.CONTROLLED_ACCESS;
    }

    /* Let access type be "Open Access". This is true for any workspace that is defined as "Open Access" in library:dataUseRestriction. */
    if ( isWorkspaceOpenAccess(workspace) ) {

        accessType = WORKSPACE_ACCESS_TYPE.OPEN_ACCESS;
    }

    return {[keyAccessType]: accessType};
}

/**
 * Returns the gap id for the specified workspace.
 * The gap id comprises of db gap identifier or study accession identifier and any corresponding study url.
 *
 * @param studyId
 * @param studyAccession
 * @param studyUrl
 * @returns {{}}
 */
function buildWorkspacePropertyGapId(studyId, studyAccession, studyUrl) {

    const keyGapId = SOURCE_FIELD_KEY.GAP_ID;
    const identifier = studyAccession || studyId;
    const gapId = buildGapId(identifier, studyUrl);

    return {[keyGapId]: gapId};
}

/**
 * Returns the merged workspace data and any additional workspace properties of interest.
 *
 * @param attributeWorkspaces
 * @param countWorkspaces
 * @param studyPropertiesById
 */
function buildWorkspaces(attributeWorkspaces, countWorkspaces, studyPropertiesById) {

    return attributeWorkspaces.reduce((acc, row) => {

        /* Grab the study id. */
        const studyId = getWorkspaceStudyId(row);

        /* Grab the corresponding study properties. */
        const propertyStudy = getWorkspaceStudy(studyId, studyPropertiesById),
            {dbGapIdAccession, studyUrl} = propertyStudy || {};

        /* Build the property accessType. */
        const propertyAccessType = buildWorkspacePropertyAccessType(row, dbGapIdAccession);

        /* Reformat the property consentShortName. */
        const propertyConsentShortName = reformatWorkspacePropertyValue(row, SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.CONSENT_SHORT_NAME]);

        /* Reformat the property consortium. */
        const propertyConsortium = reformatWorkspacePropertyConsortium(row);

        /* Reformat the property dataTypes. */
        const propertyDataTypes = reformatWorkspacePropertyList(row, SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.DATA_TYPES]);

        /* Reformat the property diseases. */
        const propertyDiseases = reformatWorkspacePropertyList(row, SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.DISEASES]);

        /* Build the property gapId. */
        const propertyGapId = buildWorkspacePropertyGapId(studyId, "", studyUrl);

        /* Build the property counts. */
        const countWorkspace = findCountWorkspace(row, countWorkspaces);

        /* Reformat the property studyDesigns. */
        const propertyStudyDesigns = reformatWorkspacePropertyList(row, SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.STUDY_DESIGNS]);

        /* Grab the workspace file size. */
        const keyFileSize = SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.SIZE];
        const size = countWorkspace[keyFileSize];

        /* Only include workspace if there is a file size. */
        if ( size && size > 0 ) {

            /* Merge properties. */
            const workspace = {
                ...countWorkspace,
                ...row,
                ...propertyAccessType,
                ...propertyConsentShortName,
                ...propertyConsortium,
                ...propertyDataTypes,
                ...propertyDiseases,
                ...propertyGapId,
                ...propertyStudyDesigns,
                ...propertyStudy, /* FHIR study values, should they exist, overwrite any corresponding properties from AnVIL. */
            };

            /* Accumulate the workspace. */
            acc.push(workspace);
        }

        return acc;
    }, []);
}

/**
 * Returns the counts for the specified workspace.
 *
 * @param row
 * @param countWorkspaces
 * @returns {*}
 */
function findCountWorkspace(row, countWorkspaces) {

    /* Grab the project id key. */
    const keyProjectId = SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.PROJECT_ID];

    /* Grab the project id value. */
    const projectId = row[keyProjectId];

    /* Find the corresponding workspaces counts. */
    const countWorkspace = countWorkspaces.find(countWorkspace => countWorkspace[keyProjectId] === projectId);

    /* Return the workspace counts if they exist. */
    if ( countWorkspace ) {

        return countWorkspace;
    }

    /* If there is no corresponding workspaces count, return the workspace count properties with a corresponding value of zero. */
    const properties = getWorkspaceProperties(countWorkspaces);

    return properties.reduce((acc, property) => Object.assign(acc, {[property]: 0}), {})
}

/**
 * Returns the properties of the specified workspace.
 *
 * @param workspaces
 * @returns {Array}
 */
function getWorkspaceProperties(workspaces) {

    const clonedWorkspaces = [...workspaces];
    const workspace = clonedWorkspaces.pop();

    return Object.keys(workspace);
}

/**
 * Returns the study for the specified workspace.
 *
 * @param studyId
 * @param studyPropertiesById
 * @returns {{dbGapIdAccession: string, studyDesigns: *[], studyName: string, studyUrl: string}|*}
 */
function getWorkspaceStudy(studyId, studyPropertiesById) {

    const study = studyPropertiesById.get(studyId);

    if ( study ) {

        return study;
    }

    return {dbGapIdAccession: "", studyDesigns: [], studyName: "", studyUrl: ""};
}

/**
 * Returns the study id for the specified workspace.
 *
 * @param workspace
 * @returns {*}
 */
function getWorkspaceStudyId(workspace) {

    const keyStudyId = SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.DB_GAP_ID];

    return workspace[keyStudyId] || "--";
}

/**
 * Returns true if the specified value is valid, does not already exist on the specified list and is not a deny list term.
 *
 * @param value
 * @param list
 * @returns {boolean}
 */
function isListValueAllowed(value, list) {

    if ( value ) {

        const listValueDistinct = !list.includes(value);
        const listValueAllowed = !isValueDenied(value);

        return listValueDistinct && listValueAllowed;
    }

    return false;
}

/**
 * Returns true if the value is on the deny list of terms.
 *
 * @param value
 * @returns {boolean}
 */
function isValueDenied(value) {

    if ( value ) {

        const testStr = value.toUpperCase();
        return DENY_LIST_TERMS.includes(testStr);
    }

    return false;
}

/**
 * Returns true if the workspace consent name is "Open Access".
 *
 * @param workspace
 * @returns {boolean}
 */
function isWorkspaceOpenAccess(workspace) {

    /* Grab the consent names. */
    const keyConsentShortName = SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.CONSENT_SHORT_NAME];
    const consentShortName = workspace[keyConsentShortName];

    /* Return true if the consent name is "Open Access", otherwise return false. */
    if ( consentShortName ) {

        return consentShortName.toUpperCase() === WORKSPACE_ACCESS_TYPE.OPEN_ACCESS.toUpperCase();
    }

    return false;
}

/**
 * Returns the source data for the specified file.
 * Will only return properties matching any source header key.
 *
 * @param fileName
 * @returns {Promise.<*[]>}
 */
async function parseSource(fileName) {

    /* Read the AnVIL source file. */
    const content = await readFile(fileName, "utf8");

    /* Split the file content into rows. */
    const contentRows = splitContentToContentRows(content);

    /* Parse and return the ingested data. */
    return parseRows(contentRows, "\t", SOURCE_FIELD_KEY, SOURCE_FIELD_TYPE);
}

/**
 * Returns the reformatted consortium workspace property.
 *
 * @param row
 * @returns {{}}
 */
function reformatWorkspacePropertyConsortium(row) {

    const keyConsortium = SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.CONSORTIUM];
    const valueConsortium = row[keyConsortium];

    if ( valueConsortium ) {

        const key = valueConsortium.toUpperCase().replace(/\s/g, "_");
        const consortium = WORKSPACE_CONSORTIUM[key] || valueConsortium;

        return {[keyConsortium]: consortium};
    }

    return {[keyConsortium]: ""};
}

/**
 * Returns the reformatted workspace property of type "array" for the specified key.
 *
 * @param row
 * @param key
 * @returns {{}}
 */
function reformatWorkspacePropertyList(row, key) {

    const values = row[key];

    /* Reformat the list. */
    const list = values.reduce((acc, value) => {

        /* Only accumulate valid values. */
        if ( isListValueAllowed(value, acc) ) {

            acc.push(value);
        }

        return acc;
    }, ["--"]);

    /* List has at least one valid value; remove placeholder element "--". */
    if ( list.length > 1 ) {

        list.shift();
    }

    return {[key]: list};
}

/**
 * Returns the reformatted workspace property of type "string" for the specified key.
 *
 * @param row
 * @param key
 * @returns {{}}
 */
function reformatWorkspacePropertyValue(row, key) {

    const value = row[key];

    if ( value && !isValueDenied(value) ) {

        return {[key]: value};
    }

    return {[key]: "--"};
}

module.exports.getWorkspaces = getWorkspaces;
