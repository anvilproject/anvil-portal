/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for AnVIL dashboard workspaces data ingestion.
 */

// Core dependencies
const fs = require("fs");
const path = require("path");

// App dependencies
const {sortDataByDuoTypes} = require(path.resolve(__dirname, "./dashboard-sort.service.js"));
const {getStudyPropertiesById} = require(path.resolve(__dirname, "./dashboard-studies-anvil.service.js"));
const {buildGapId} = require(path.resolve(__dirname, "./dashboard-study.service.js"));

// Template variables
const ALLOW_LIST_WORKSPACE_FIELD_ARRAY = ["consentShortNames", "dataTypes", "diseases"];
const ALLOW_LIST_WORKSPACE_FIELD_NUMBER = ["size", "samples", "subjects"];
const DENY_LIST_TERMS = ["ATTRIBUTEVALUE", "N/A", "NA", "", null];
const fileAnVILDataIngestion = "anvil-data-ingestion-attributes.tsv";
const fileTerraDataIngestion = "terra-data-ingestion-attributes.tsv";
const WORKSPACE_ACCESS_TYPE_DISPLAY_VALUE = {
    "CONSORTIUM_ACCESS": "Consortium Access",
    "CONTROLLED_ACCESS": "Controlled Access",
    "OPEN_ACCESS": "Open Access",
};
const WORKSPACE_CONSORTIUM_DISPLAY_VALUE = {
    "CCDG": "CCDG",
    "CONVERGENT_NEURO": "Convergent Neuro",
    "CMG": "CMG",
    "EMERGE": "eMERGE",
    "GTEX": "GTEx (v8)",
    "NHGRI": "NHGRI",
    "PAGE": "PAGE",
    "THOUSANDGENOMES": "1000 Genomes",
    "WGSPD1": "WGSPD1",
    "1000G": "1000 Genomes"
};
const INGESTION_HEADERS_TO_WORKSPACE_KEY = {
    "CONSENT_SHORT_NAMES": "library:dataUseRestriction",
    "CONSORTIUM": "Consortium",
    "DATA_TYPES": "library:datatype.items",
    "DB_GAP_ID": "study_accession",
    "DISEASES": "library:indication",
    "PROJECT_ID": "name",
    "LIBRARY_PROJECT_NAME": "library:projectName",
    "SAMPLES": "Sample Count",
    "SIZE": "File Size",
    "SUBJECTS": "library:numSubjects",
    "WORKSPACE": "Workspace"
};
const HEADERS_TO_WORKSPACE_KEY = {
    "ACCESS_TYPE": "accessType",
    [INGESTION_HEADERS_TO_WORKSPACE_KEY.CONSENT_SHORT_NAMES]: "consentShortNames",
    [INGESTION_HEADERS_TO_WORKSPACE_KEY.CONSORTIUM]: "consortium",
    [INGESTION_HEADERS_TO_WORKSPACE_KEY.DATA_TYPES]: "dataTypes",
    [INGESTION_HEADERS_TO_WORKSPACE_KEY.DB_GAP_ID]: "dbGapId",
    "DB_GAP_ID_ACCESSION": "dbGapIdAccession",
    [INGESTION_HEADERS_TO_WORKSPACE_KEY.DISEASES]: "diseases",
    "GAP_ID": "gapId",
    [INGESTION_HEADERS_TO_WORKSPACE_KEY.PROJECT_ID]: "projectId",
    [INGESTION_HEADERS_TO_WORKSPACE_KEY.SAMPLES]: "samples",
    [INGESTION_HEADERS_TO_WORKSPACE_KEY.SIZE]: "size",
    [INGESTION_HEADERS_TO_WORKSPACE_KEY.SUBJECTS]: "subjects",
    [INGESTION_HEADERS_TO_WORKSPACE_KEY.WORKSPACE]: "projectId"
};

/**
 * Returns the AnVIL workspaces from ingested data.
 *
 * @returns {Promise.<void>}
 */
const getWorkspaces = async function getWorkspaces() {

    /* Build workspace counts. */
    const countWorkspaces = await buildWorkspacesAttributes(fileTerraDataIngestion);

    /* Build the workspace attributes. */
    const attributeWorkspaces = await buildWorkspacesAttributes(fileAnVILDataIngestion);

    /* Create a map object key-value pair of study accession by study id. */
    const studyPropertiesById = await getStudyPropertiesById(attributeWorkspaces);

    /* Merge the workspace data and build any additional rule based data, and associated study properties. */
    const workspaces = buildWorkspaces(attributeWorkspaces, countWorkspaces, studyPropertiesById);

    /* Return the sorted dashboard, sorted first by consortium, then by project name. */
    const keyConsortium = HEADERS_TO_WORKSPACE_KEY[INGESTION_HEADERS_TO_WORKSPACE_KEY.CONSORTIUM];
    const keyProjectId = HEADERS_TO_WORKSPACE_KEY[INGESTION_HEADERS_TO_WORKSPACE_KEY.PROJECT_ID];

    return sortDataByDuoTypes(workspaces, keyConsortium, keyProjectId);
};

/**
 * Returns the ingested datum, corrected for type.
 * i.e. will return a number as Number, instead of a string.
 *
 * @param datum
 * @param key
 * @returns {*}
 */
function buildIngestedDatum(datum, key) {

    if ( ALLOW_LIST_WORKSPACE_FIELD_NUMBER.includes(key) ) {

        return Number(datum.replace(/,/g, ""));
    }

    const value = formatIngestedDatum(datum, key);

    if ( ALLOW_LIST_WORKSPACE_FIELD_ARRAY.includes(key) ) {

        return value
            .split(";")
            .reduce((acc, val) => {

                const str = val.trim();

                if ( str ) {

                    acc.push(str);
                }

                return acc;
            }, []);
    }

    return value;
}

/**
 * Returns the ingested headers.
 *
 * @param contentRows
 * @returns {Array}
 */
function buildIngestedHeaders(contentRows) {

    return contentRows
        .slice(0, 1)
        .toString()
        .split("\t")
}

/**
 * Returns the ingested row.
 *
 * @param contentRow
 * @param headers
 * @returns {*}
 */
function buildIngestedRow(contentRow, headers) {

    /* Grab the ingested row data. */
    return contentRow
        .split("\t")
        .reduce((acc, datum, i) => {

            const header = headers[i];
            const [key, value] = getIngestedDatumKeyValuePair(datum, header);

            /* Only include data we are interested in. */
            if ( key ) {

                acc = Object.assign(acc, {[key]: value});
            }

            return acc;
        }, {});
}

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

    const keyAccessType = HEADERS_TO_WORKSPACE_KEY.ACCESS_TYPE;

    /* Let access type be "Consortium Access". This is true for any workspace that does not have a study, or is not "Open Access". */
    let accessType = WORKSPACE_ACCESS_TYPE_DISPLAY_VALUE.CONSORTIUM_ACCESS;

    /* Let access type be "Controlled Access". This is true for any workspace that has a study, or is not "Open Access". */
    if ( studyAccession ) {

        accessType = WORKSPACE_ACCESS_TYPE_DISPLAY_VALUE.CONTROLLED_ACCESS;
    }

    /* Let access type be "Open Access". This is true for any workspace that is defined as "Open Access" in library:dataUseRestriction. */
    if ( isWorkspaceOpenAccess(workspace) ) {

        accessType = WORKSPACE_ACCESS_TYPE_DISPLAY_VALUE.OPEN_ACCESS;
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

    const keyGapId = HEADERS_TO_WORKSPACE_KEY.GAP_ID;
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

        /* Build the property gapId. */
        const propertyGapId = buildWorkspacePropertyGapId(studyId, dbGapIdAccession, studyUrl);

        /* Build the property counts. */
        const countWorkspace = findCountWorkspace(row, countWorkspaces);

        /* Grab the workspace file size. */
        const keyFileSize = HEADERS_TO_WORKSPACE_KEY[INGESTION_HEADERS_TO_WORKSPACE_KEY.SIZE];
        const size = countWorkspace[keyFileSize];

        /* Only include workspace if there is a file size. */
        if ( size && size > 0 ) {

            /* Merge properties. */
            const workspace = {...countWorkspace, ...row, ...propertyAccessType, ...propertyGapId, ...propertyStudy};

            /* Accumulate. */
            acc.push(workspace);
        }

        return acc;
    }, []);
}

/**
 * Returns the ingested data for the specified file.
 * Will only return properties matching any ingestion headers workspace key.
 *
 * @param fileName
 * @returns {Promise.<*[]>}
 */
async function buildWorkspacesAttributes(fileName) {

    /* Grab the header and file contents. */
    const [headers, contentRows] = await getIngestedData(fileName);

    /* Grab from each content row the ingested data. */
    return await Promise.all(contentRows
        .slice(1)
        .map(contentRow => buildIngestedRow(contentRow, headers)));
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
    const keyProjectId = HEADERS_TO_WORKSPACE_KEY[INGESTION_HEADERS_TO_WORKSPACE_KEY.PROJECT_ID];

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
 * Returns formatted ingested datum, specified by key.
 *
 * @param datum
 * @param key
 * @returns {*}
 */
function formatIngestedDatum(datum, key) {

    /* Consortium. */
    if ( key === HEADERS_TO_WORKSPACE_KEY[INGESTION_HEADERS_TO_WORKSPACE_KEY.CONSORTIUM] ) {

        const consortium = datum ? datum.toUpperCase().replace(/\s/g, "_") : "";

        return WORKSPACE_CONSORTIUM_DISPLAY_VALUE[consortium] || consortium;
    }

    /* Data Types. */
    if ( key === HEADERS_TO_WORKSPACE_KEY[INGESTION_HEADERS_TO_WORKSPACE_KEY.DATA_TYPES] ) {

        // TODO review deny list duplication, multiple data types
        if ( datum && DENY_LIST_TERMS.includes(datum.toUpperCase()) ) {

            return "--";
        }
    }

    /* Disease. */
    if ( key === HEADERS_TO_WORKSPACE_KEY[INGESTION_HEADERS_TO_WORKSPACE_KEY.DISEASES] ) {

        // TODO review multiple diseases
        if ( datum && DENY_LIST_TERMS.includes(datum.toUpperCase()) ) {

            return "--";
        }
    }

    if ( !datum ) {

        return "--";
    }

    return datum;
}

/**
 * Returns the contents of the specified file, as an array.
 * Each element of the array represents a row (as a string value) from the file.
 *
 * @param fileName
 * @returns {Promise.<Array>}
 */
async function getFileContents(fileName) {

    /* Only return ingested workspaces if the file exists. */
    if ( fs.existsSync(path.resolve(__dirname, fileName)) ) {

        const filePath = path.resolve(__dirname, fileName);
        const fileContent = await fs.readFileSync(filePath, "utf8");

        /* Return the file content as an array. */
        return fileContent.toString().split("\r\n");
    }
    else {

        /* File does not exist. */
        console.log(`Error: file ${fileName} cannot be found.`);
        return [];
    }
}

/**
 * Returns the ingested header and content for the specified file.
 *
 * @param fileName
 * @returns {Promise.<[null,null]>}
 */
async function getIngestedData(fileName) {

    /* Grab the file contents. */
    const contentRows = await getFileContents(fileName);

    /* Grab the data header row. */
    const headers = buildIngestedHeaders(contentRows);

    return [headers, contentRows];
}

/**
 * Returns the datum key (if it exists), and corresponding formatted value.
 *
 * @param datum
 * @param header
 * @returns {[null,null]}
 */
function getIngestedDatumKeyValuePair(datum, header) {

    const key = HEADERS_TO_WORKSPACE_KEY[header];
    const value = buildIngestedDatum(datum, key);

    return [key, value];
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
 */
function getWorkspaceStudy(studyId, studyPropertiesById) {

    return studyPropertiesById.get(studyId);
}

/**
 * Returns the study id for the specified workspace.
 *
 * @param workspace
 * @returns {*}
 */
function getWorkspaceStudyId(workspace) {

    const keyStudyId = HEADERS_TO_WORKSPACE_KEY[INGESTION_HEADERS_TO_WORKSPACE_KEY.DB_GAP_ID];

    return workspace[keyStudyId];
}

/**
 * Returns true if the workspace consent name is "Open Access".
 *
 * @param workspace
 * @returns {boolean}
 */
function isWorkspaceOpenAccess(workspace) {

    /* Grab the consent names. */
    const keyConsentShortNames = HEADERS_TO_WORKSPACE_KEY[INGESTION_HEADERS_TO_WORKSPACE_KEY.CONSENT_SHORT_NAMES];
    const consentShortNames = workspace[keyConsentShortNames];

    /* Return true if any consent name is "Open Access", otherwise return false. */
    if ( consentShortNames && consentShortNames.length > 0 ) {

        return consentShortNames.some(consentName => consentName.toLowerCase() === WORKSPACE_ACCESS_TYPE_DISPLAY_VALUE.OPEN_ACCESS.toLowerCase())
    }

    return false;
}

module.exports.getWorkspaces = getWorkspaces;
