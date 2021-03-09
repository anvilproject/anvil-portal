/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for parsing fetched study json into FE model.
 */

// Core dependencies
const fetch = require("node-fetch");

// Template dependencies
const studyJSONURLPrefix = "https://dbgap-api.ncbi.nlm.nih.gov/fhir/x1/ResearchStudy?_id=";
const studyJSONURLSuffix = "&_format=json";

/**
 * Builds the study from the ncpi study JSON.
 * Returns the study's data types.
 *
 * @param dbGapIdAccession
 * @returns {Promise.<{dataTypes: Array}>}
 */
const buildJSONStudy = async function buildJSONStudy(dbGapIdAccession) {

    /* Initialize the study object. */
    let study = {dataTypes: []};

    if ( dbGapIdAccession ) {

        /* Build the study JSON url. */
        const studyJSONURL = `${studyJSONURLPrefix}${dbGapIdAccession}${studyJSONURLSuffix}`;

        /* Grab the JSON. */
        const studyJSON = await fetchStudyJson(studyJSONURL);

        if ( studyJSON ) {

            const {entry} = studyJSON;

            return getStudy(entry, study);
        }
    }

    return study;
};

/**
 * Fetches db gap study JSON page specified by URL and returns corresponding raw JSON.
 *
 * @param url
 * @returns {Promise.<*>}
 */
async function fetchStudyJson(url) {

    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error(`Fetch error: ${error}, ${url}`));
}

/**
 * Returns resource extension specified by extension type.
 *
 * @param resourceExtensions
 * @param stringSnippet
 * @returns {Array}
 */
function findExtensionType(resourceExtensions, stringSnippet) {

    if ( resourceExtensions ) {

        return resourceExtensions.find(extensions => {

            const {url} = extensions;

            return url.toLowerCase().includes(stringSnippet);
        })
    }

    return [];
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
 * Returns the molecular data types for the study.
 *
 * @param molecularDataTypes
 * @returns {Array}
 */
function getMolecularDataTypes(molecularDataTypes) {

    if ( molecularDataTypes ) {

        const {extension} = molecularDataTypes;

        if ( extension ) {

            return extension.reduce((acc, molecularDataType) => {

                const {valueCodeableConcept} = molecularDataType || {},
                    {coding} = valueCodeableConcept || {};

                const codes = getMolecularCodes(coding);

                return acc.concat(codes);
            }, []);
        }
    }

    return [];
}

/**
 * Returns a FE model of study.
 *
 * @param entries
 * @param study
 * @returns {*}
 */
function getStudy(entries, study) {

    if ( entries ) {

        return entries.reduce((acc, entry) => {

            /* Grab the resource extensions. */
            const {resource} = entry || {};
            const resourceExtensions = resource.extension;

            /* Filter the resource extensions for the molecular data types; the url ends with ~MolecularDataTypes. */
            const molecularDataTypes = findExtensionType(resourceExtensions, "moleculardatatypes");

            /* Grab the molecular codes. */
            const molecularCodes = getMolecularDataTypes(molecularDataTypes);
            const dataTypes = acc.dataTypes;

            return {...acc, dataTypes: dataTypes.concat(molecularCodes)};
        }, study);
    }

    return study;
}

module.exports.buildJSONStudy = buildJSONStudy;
