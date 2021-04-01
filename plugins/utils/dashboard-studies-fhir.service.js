/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for parsing fetched FHIR json into FE model.
 */

// Core dependencies
const fetch = require("node-fetch");

// Template dependencies
const urlPrefixFHIR = "https://dbgap-api.ncbi.nlm.nih.gov/fhir/x1/ResearchStudy?_id=";
const urlSuffixFHIR = "&_format=json";

/**
 * Builds the study from the FHIR JSON.
 *
 * @param dbGapIdAccession
 * @returns {Promise.<{dataTypes: Array}>}
 */
const getFHIRStudy = async function getFHIRStudy(dbGapIdAccession) {

    /* Build the FHIR url. */
    const url = `${urlPrefixFHIR}${dbGapIdAccession}${urlSuffixFHIR}`;

    /* Fetch the JSON. */
    const fhirJSON = await fetchFHIRJson(url);

    /* Initialize study. */
    let study = {dataTypes: [], diseases: [], studyName: ""};

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
        const cloneStudy = Object.assign(study, {studyName: studyName});

        return entries.reduce((acc, entry) => {

            /* Grab the resource extensions. */
            const {resource} = entry || {};

            /* Roll up the molecular codes. */
            const dataTypes = rollUpDataTypes(resource, acc.dataTypes);

            /* Roll up the diseases. */
            const diseases = rollUpDiseases(resource, acc.diseases);

            /* Accumulate the values. */
            return Object.assign(acc, {dataTypes: dataTypes, diseases: diseases});
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

    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error(`Fetch error: ${error}, ${url}`));
}

/**
 * Returns the resource extension specified by extension type.
 *
 * @param resource
 * @param stringSnippet
 * @returns {{}}
 */
function findExtensionType(resource, stringSnippet) {

    const resourceExtensions = resource.extension;

    if ( resourceExtensions ) {

        return resourceExtensions.find(extensions => {

            const {url} = extensions;

            if ( url ) {

                return url.toLowerCase().includes(stringSnippet);
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

        /* Return study name. */
        return resource.title || "";
    }

    return "";
}

/**
 * Returns the molecular data types for the study.
 *
 * @param resource
 * @param dataTypes
 * @returns {Array}
 */
function rollUpDataTypes(resource, dataTypes) {

    if ( resource ) {

        /* Filter the resource extensions for the molecular data types; the url ends with ~MolecularDataTypes. */
        const molecularDataType = findExtensionType(resource, "moleculardatatypes");

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
 * @param diseases
 * @returns {*}
 */
function rollUpDiseases(resource, diseases) {

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

module.exports.getFHIRStudy = getFHIRStudy;
