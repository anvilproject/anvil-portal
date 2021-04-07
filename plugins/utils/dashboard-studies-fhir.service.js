/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for parsing fetched FHIR json into FE model.
 */

// Core dependencies
const {decode} = require("html-entities");
const fetch = require("node-fetch");

// Template dependencies
const urlPrefixFHIR = "https://dbgap-api.ncbi.nlm.nih.gov/fhir/x1/ResearchStudy?_id=";
const urlSuffixFHIR = "&_format=json";
const PROPERTIES_TO_PROPERTY_KEY = {
    "CONSENT_CODES": "consentCodes",
    "DATA_TYPES": "dataTypes",
    "DISEASES": "diseases",
    "STUDY_NAME": "studyName",
    "SUBJECTS_TOTAL": "subjectsTotal"
};

/**
 * Builds the study from the FHIR JSON.
 *
 * @param dbGapIdAccession
 * @returns {Promise.<*>}
 */
const getFHIRStudy = async function getFHIRStudy(dbGapIdAccession) {

    /* Build the FHIR url. */
    const url = `${urlPrefixFHIR}${dbGapIdAccession}${urlSuffixFHIR}`;

    /* Fetch the JSON. */
    const fhirJSON = await fetchFHIRJson(url);

    /* Initialize study. */
    let study = initializeStudy();

    if ( fhirJSON ) {

        const entries = fhirJSON.entry;

        /* Return the study. */
        return buildFHIRStudy(entries, study);
    }

    return study;
};

/**
 * Returns a FE model of study.
 *
 * @param entries
 * @param study
 * @returns {*}
 */
function buildFHIRStudy(entries, study) {

    if ( entries ) {

        /* Grab the study name and assign to the study. */
        const studyName = getStudyName(entries);
        const cloneStudy = Object.assign(study, {[PROPERTIES_TO_PROPERTY_KEY.STUDY_NAME]: studyName});

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
                [PROPERTIES_TO_PROPERTY_KEY.CONSENT_CODES]: consentCodes,
                [PROPERTIES_TO_PROPERTY_KEY.DATA_TYPES]: dataTypes,
                [PROPERTIES_TO_PROPERTY_KEY.DISEASES]: diseases,
                [PROPERTIES_TO_PROPERTY_KEY.SUBJECTS_TOTAL]: subjectsTotal
            });
        }, cloneStudy);
    }

    return study;
}

/**
 * Fetches FHIR page specified by URL and returns corresponding raw JSON.
 *
 * @param url
 * @returns {Promise.<*>}
 */
async function fetchFHIRJson(url) {

    let fetchFHIR = await fetch(url);
    const fetchStatus = fetchFHIR.status;

    if ( fetchStatus === 200 ) {

        return await fetchFHIR.json();
    }
    else {

        console.log(`Fetch status error ${fetchStatus} for ${url}`);
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
        [PROPERTIES_TO_PROPERTY_KEY.CONSENT_CODES]: [],
        [PROPERTIES_TO_PROPERTY_KEY.DATA_TYPES]: [],
        [PROPERTIES_TO_PROPERTY_KEY.DISEASES]: [],
        [PROPERTIES_TO_PROPERTY_KEY.STUDY_NAME]: "",
        [PROPERTIES_TO_PROPERTY_KEY.SUBJECTS_TOTAL]: 0
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

        return urlStr.includes(extensionStr)
    }

    return false;
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
    const consentCodes = acc[PROPERTIES_TO_PROPERTY_KEY.CONSENT_CODES];

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
    const dataTypes = acc[PROPERTIES_TO_PROPERTY_KEY.DATA_TYPES];

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
    const diseases = acc[PROPERTIES_TO_PROPERTY_KEY.DISEASES];

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
    const subjectsTotal = acc[PROPERTIES_TO_PROPERTY_KEY.SUBJECTS_TOTAL];

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
