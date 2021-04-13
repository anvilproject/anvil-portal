/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for fetched FHIR JSON.
 */

// Core dependencies
const {decode} = require("html-entities");
const fetch = require("node-fetch");
const path = require("path");

// App dependencies
const {cacheFile, readFile} = require(path.resolve(__dirname, "./dashboard-file-system.service.js"));

// Template dependencies
const dirCacheFHIR = "../../db-gap-cache";
const FHIR_FIELD_KEY = {
    "CONSENT_CODES": "consentCodes",
    "DATA_TYPES": "dataTypes",
    "DISEASES": "diseases",
    "STUDY_NAME": "studyName",
    "SUBJECTS_TOTAL": "subjectsTotal"
};
const urlPrefixFHIR = "https://dbgap-api.ncbi.nlm.nih.gov/fhir/x1/ResearchStudy?_id=";
const urlSuffixFHIR = "&_format=json";

/**
 * Builds the study from the FHIR JSON.
 *
 * @param dbGapIdAccession
 * @returns {Promise.<*>}
 */
const getFHIRStudy = async function getFHIRStudy(dbGapIdAccession) {

    /* Initialize study. */
    let study = initializeStudy();

    /* Grab the FHIR JSON. */
    const fhirJSON = await getFHIRJSON(dbGapIdAccession);

    /* Return the study. */
    return buildFHIRStudy(fhirJSON, study);
};

/**
 * Returns the FHIR JSON study name.
 *
 * @param dbGapIdAccession
 * @returns {Promise.<*>}
 */
const getFHIRStudyName = async function getFHIRStudyName(dbGapIdAccession) {

    /* Grab the FHIR JSON. */
    const fhirJSON = await getFHIRJSON(dbGapIdAccession);

    if ( fhirJSON ) {

        const entries = fhirJSON.entry;

        /* Return the study name. */
        return getStudyName(entries);
    }

    return "";
};

/**
 * Returns a FE model of study.
 *
 * @param fhirJSON
 * @param study
 * @returns {*}
 */
function buildFHIRStudy(fhirJSON, study) {

    if ( fhirJSON ) {

        const entries = fhirJSON.entry;

        /* Grab the study name and assign to the study. */
        const studyName = getStudyName(entries);
        const cloneStudy = Object.assign(study, {[FHIR_FIELD_KEY.STUDY_NAME]: studyName});

        return entries.reduce((acc, entry) => {

            /* Grab the resource extensions. */
            const {resource} = entry || {};

            /* Roll up the consent codes. */
            const consentCodes = rollUpConsentCodes(resource, acc);

            /* Roll up the molecular codes. */
            const dataTypes = rollUpDataTypes(resource, acc);

            /* Roll up the diseases. */
            const diseases = rollUpDiseases(resource, acc);

            /* Roll up subjects total. */
            const subjectsTotal = rollUpSubjectsTotal(resource, acc);

            /* Accumulate the values. */
            return Object.assign(acc, {
                [FHIR_FIELD_KEY.CONSENT_CODES]: consentCodes,
                [FHIR_FIELD_KEY.DATA_TYPES]: dataTypes,
                [FHIR_FIELD_KEY.DISEASES]: diseases,
                [FHIR_FIELD_KEY.SUBJECTS_TOTAL]: subjectsTotal
            });
        }, cloneStudy);
    }

    return study;
}

/**
 * Caches the FHIR JSON.
 *
 * @param dbGapIdAccession
 * @param fhirJSON
 * @returns {Promise.<void>}
 */
async function cacheFHIR(dbGapIdAccession, fhirJSON) {

    const file = `${dirCacheFHIR}/${dbGapIdAccession}.json`;
    console.log(`Caching FHIR JSON for ${file}`);

    /* Cache the JSON. */
    await cacheFile(file, JSON.stringify(fhirJSON));
}

/**
 * Fetches FHIR page specified by URL and returns corresponding raw JSON.
 * Valid FHIR JSON will be cached for future use.
 *
 * @param dbGapIdAccession
 * @returns {Promise.<*>}
 */
async function fetchFHIRJSON(dbGapIdAccession) {

    const url = `${urlPrefixFHIR}${dbGapIdAccession}${urlSuffixFHIR}`;
    const response = await fetch(url);
    const status = response.status;

    /* Parse the response. */
    if ( status === 200 ) {

        return await parseFHIRJSON(dbGapIdAccession, response);
    }
    else {

        console.log(`FHIR fetch status error ${status} for ${url}`);
    }
}

/**
 * Returns the resource extension specified by extension type.
 *
 * @param resource
 * @param stringSnippet
 * @returns {{}}
 */
function findExtensionType(resource, stringSnippet = "") {

    const resourceExtensions = resource.extension;

    if ( resourceExtensions ) {

        return resourceExtensions.find(extensions => {

            const {url} = extensions;

            if ( url ) {

                const subStr = stringSnippet.toLowerCase();

                return url.toLowerCase().includes(subStr);
            }

            return false;
        })
    }
}

/**
 * Returns FHIR JSON.
 * JSON will be sourced from cache. If the JSON is not cached, then the JSON is fetched and stored into cache for future use.
 *
 * @returns {Promise.<*>}
 * @param dbGapIdAccession
 */
async function getFHIRJSON(dbGapIdAccession) {

    if ( dbGapIdAccession ) {

        /* Grab the FHIR study JSON from cache. */
        const fhirJSON = await readCacheFHIR(dbGapIdAccession);

        /* Return the FHIR study from cache. */
        if ( fhirJSON ) {

            return fhirJSON;
        }

        /* Otherwise, fetch the FHIR study JSON. */
        /* FHIR JSON are cached for future use. */
        return await fetchFHIRJSON(dbGapIdAccession);
    }
}

/**
 * Returns the molecular data types.
 *
 * @param coding
 * @returns {Array}
 */
function getMolecularCodes(coding) {

    if ( coding ) {

        return coding.reduce((acc, molecularCode) => {

            const {code} = molecularCode;

            return acc.concat(code);
        }, [])
    }

    return [];
}

/**
 * Returns the study name associated with the first entry.
 * Any subsequent entries are ignored.
 *
 * @returns {string}
 * @param entries
 */
function getStudyName(entries) {

    /* Grab the first entry's resource property. */
    const entry = entries[0];
    const resource = entry.resource;

    if ( resource ) {

        const title = resource.title;

        /* Return study name. */
        if ( title ) {

            return decode(title);
        }
    }

    return "";
}

/**
 * Returns the initialized study object.
 *
 * @returns {{}}
 */
function initializeStudy() {

    return {
        [FHIR_FIELD_KEY.CONSENT_CODES]: [],
        [FHIR_FIELD_KEY.DATA_TYPES]: [],
        [FHIR_FIELD_KEY.DISEASES]: [],
        [FHIR_FIELD_KEY.STUDY_NAME]: "",
        [FHIR_FIELD_KEY.SUBJECTS_TOTAL]: 0
    };
}

/**
 * Returns true if the specified extension type string is in the specified url.
 *
 * @param url
 * @param extensionType
 * @returns {boolean}
 */
function isExtensionType(url, extensionType = "") {

    if ( url ) {

        const extensionStr = extensionType.toLowerCase();
        const urlStr = url.toLowerCase();

        return urlStr.includes(extensionStr);
    }

    return false;
}

/**
 * Returns parsed FHIR JSON.
 *
 * @param dbGapIdAccession
 * @param response
 * @returns {Promise.<*>}
 */
async function parseFHIRJSON(dbGapIdAccession, response) {

    /* Grab the JSON. */
    const json = await response.json();

    /* Only cache and return valid FHIR JSON. */
    if ( json && json.entry ) {

        await cacheFHIR(dbGapIdAccession, json);

        return json;
    }
    else {

        console.log(`FHIR response incomplete and will not be cached for ${dbGapIdAccession}`);
    }
}

/**
 * Returns the cached FHIR JSON.
 *
 * @param dbGapIdAccession
 * @returns {Promise.<*>}
 */
async function readCacheFHIR(dbGapIdAccession) {

    /* Grab the FHIR content from cache. */
    const file = `${dirCacheFHIR}/${dbGapIdAccession}.json`;
    const content = await readFile(file);

    /* Return the JSON. */
    if ( content ) {

        return await JSON.parse(content);
    }
}

/**
 * Returns the consent codes for the study.
 *
 * @param resource
 * @param acc
 * @returns {*}
 */
function rollUpConsentCodes(resource, acc) {

    /* Define the extension type of interest. */
    const extensionType = "ResearchStudy-StudyConsents";

    /* Grab any accumulated consent codes. */
    const consentCodes = acc[FHIR_FIELD_KEY.CONSENT_CODES];

    if ( resource ) {

        /* Find the resource extensions for the study consents; the url ends with ~ResearchStudy-StudyConsents. */
        const studyConsents = findExtensionType(resource, extensionType);

        if ( studyConsents ) {

            const {extension} = studyConsents;

            if ( extension ) {

                return extension.reduce((acc, node) => {

                    const {valueCoding} = node || {},
                        {display} = valueCoding || {};

                    return acc.concat(display);
                }, consentCodes);
            }
        }
    }

    return consentCodes;
}

/**
 * Returns the molecular data types for the study.
 *
 * @param resource
 * @param acc
 * @returns {Array}
 */
function rollUpDataTypes(resource, acc) {

    /* Define the extension type of interest. */
    const extensionType = "MolecularDataTypes";

    /* Grab any accumulated data types. */
    const dataTypes = acc[FHIR_FIELD_KEY.DATA_TYPES];

    if ( resource ) {

        /* Find the resource extensions for the molecular data types; the url ends with ~MolecularDataTypes. */
        const molecularDataType = findExtensionType(resource, extensionType);

        if ( molecularDataType ) {

            const {extension} = molecularDataType;

            if ( extension ) {

                return extension.reduce((acc, node) => {

                    const {valueCodeableConcept} = node || {},
                        {coding} = valueCodeableConcept || {};

                    const codes = getMolecularCodes(coding);

                    return acc.concat(codes);
                }, dataTypes);
            }
        }
    }

    return dataTypes;
}

/**
 * Returns the diseases, rolled up from focus field's text field.
 *
 * @param resource
 * @param acc
 * @returns {*}
 */
function rollUpDiseases(resource, acc) {

    /* Grab any accumulated diseases. */
    const diseases = acc[FHIR_FIELD_KEY.DISEASES];

    if ( resource ) {

        /* Grab the focus array. */
        const focuses = resource.focus;

        if ( focuses ) {

            return focuses.reduce((acc, focus) => {

                const {text} = focus || {};
                acc.push(text);

                return acc;
            }, diseases)
        }
    }

    return diseases;
}

/**
 *
 * @param resource
 * @param acc
 */
function rollUpSubjectsTotal(resource, acc) {

    /* Define the extension type of interest. */
    const extensionType = "ResearchStudy-Content";
    const extensionTypeCount = "ResearchStudy-Content-NumSubjects";

    /* Grab any accumulated subjects totals. */
    const subjectsTotal = acc[FHIR_FIELD_KEY.SUBJECTS_TOTAL];

    if ( resource ) {

        /* Find the resource extensions for the study content; the url ends with ~ResearchStudy-Content. */
        const studyContent = findExtensionType(resource, extensionType);

        if ( studyContent ) {

            const {extension} = studyContent;

            if ( extension ) {

                return extension.reduce((acc, node) => {

                    const {url, valueCount} = node || {},
                        {value} = valueCount || {};

                    if ( isExtensionType(url, extensionTypeCount) && value ) {

                        acc += value;
                    }

                    return acc;
                }, subjectsTotal);
            }
        }
    }

    return subjectsTotal;
}

module.exports.getFHIRStudy = getFHIRStudy;
module.exports.getFHIRStudyName = getFHIRStudyName;
