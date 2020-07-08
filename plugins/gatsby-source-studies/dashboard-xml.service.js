/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for parsing fetched xml into FE model.
 */

// Core dependencies
const DomParser = require("dom-parser");
const fetch = require("node-fetch");
const {parseString} = require("xml2js");

// Template dependencies
const ncbiPath = "https://ftp.ncbi.nlm.nih.gov/dbgap/studies/";

/**
 * Builds the subject dictionary schema.
 * Includes the study accession and the consent phv id with the subject participation value.
 *
 * @param url
 * @returns {Promise.<{dbGapIdAccession: *, variableConsentId: string}>}
 */
const buildDict = async function buildDict(url) {

    const {data_table} = await fetchXML(url),
        {variable} = data_table;

    /* Attributes - study_id, participant_set. */
    const dbGapIdAccession = data_table.att.study_id;
    const participantSet = data_table.att.participant_set;

    /* <variables> filtered by var_name is "CONSENT". */
    const variableConsentId = getDictionaryConsentId(variable);
    const consentId = `${variableConsentId}.p${participantSet}`;

    return {
        dbGapIdAccession: dbGapIdAccession,
        variableConsentId: consentId
    };
};

/**
 * Build the study schema from gap exchange xml file.
 * Includes study accession, study name and diseases.
 *
 * @param url
 * @returns {Promise.<{consentGroups, dbGapIdAccession: *, diseases, name: {longName, shortName}}>}
 */
const buildExchange = async function buildExchange(url) {

    const {GaPExchange} = await fetchXML(url),
        {Studies} = GaPExchange || {},
        {Study} = Studies || {},
        {Configuration} = Study || {},
        {ConsentGroups, Diseases, StudyNameEntrez, StudyNameReportPage} = Configuration || {},
        {ConsentGroup} = ConsentGroups || {},
        {Disease} = Diseases || {};

    /* Attributes - accession. */
    const dbGapIdAccession = Study.att.accession;

    /* Diseases, normalize and build. */
    const diseasesNormalized = normalizeNodeData(Disease);
    const diseases = buildStudyDiseases(diseasesNormalized);

    /* Consent groups. */
    const consentGroups = buildStudyConsentGroups(ConsentGroup);

    return {
        consentGroups: consentGroups,
        dbGapIdAccession: dbGapIdAccession,
        diseases: diseases,
        name: {
            longName: StudyNameReportPage,
            shortName: StudyNameEntrez,
        }
    };
};

/**
 * Build the subject report schema.
 * Includes study accession, study name, and the <variables> tags where var_name is "CONSENT".
 *
 * @param url
 * @returns {Promise.<{dbGapIdAccession: *, name: *, variables: {}}>}
 */
const buildReport = async function buildReport(url) {

    const {data_table} = await fetchXML(url),
        {variable} = data_table;

    /* Attributes - dbGapId, study_id. */
    const dbGapIdAccession = data_table.att.study_id;
    const studyName = data_table.att.study_name;

    /* <variables> filtered by var_name is "CONSENT". */
    const variablesByConsent = getSubjectVariablesByConsent(variable);

    return {
        dbGapIdAccession: dbGapIdAccession,
        name: studyName,
        variables: variablesByConsent
    };
};

/**
 * Returns the XML urls (exchange, data_dict and var_report urls) for the specified gapId.
 *
 * @param gapAccession
 * @returns {Promise.<{dict: string, gapExchange: string, report: string}>}
 */
const getXMLUrls = async function getXMLUrls(gapAccession) {

    /* Get the gapId from the accession. */
    const gapId = gapAccession.split(".")[0];

    /* Grab the gap index page. */
    const indexURL = `${ncbiPath}${gapId}/${gapAccession}/pheno_variable_summaries/`;
    const indexes = await fetchIndex(indexURL);
    const indexRefs = indexes.getElementsByTagName("a").map(element => element.getAttribute("href"));

    const dictXMLRef = indexRefs.find(ref => ref.toLowerCase().includes("subject.data_dict"));
    const reportXMLRef = indexRefs.find(ref => ref.toLowerCase().includes("subject.var_report"));

    /* Gap exchange, subject dictionary and report XML URLs. */
    const exchangeURL = `${ncbiPath}${gapId}/${gapAccession}/GapExchange_${gapAccession}.xml`;
    const dictURL = `${ncbiPath}${gapId}/${gapAccession}/pheno_variable_summaries/${dictXMLRef}`;
    const reportURL = `${ncbiPath}${gapId}/${gapAccession}/pheno_variable_summaries/${reportXMLRef}`;

    return {dict: dictURL, gapExchange: exchangeURL, report: reportURL};
};

/**
 * Handles any data with key "_" and its associated value
 * and returns an array of the same shape as other data without the key "_".
 *
 * @param nodeData
 * @returns {*}
 */
function assignNodeValue(nodeData) {

    let packagedNode = nodeData;

    /* Handle any node with key "_" and its associated value.
     * An example would be <enum code="1" count="2149">Disease-Specific (Cardiology, MDS, GSO) (DS-CARD-MDS-GSO)</enum>.
     * The node data returns an object e.g. {"_": "Disease-Specific...., {code: "1", count: "2149"}}.
     * For consistency within the normalization method the value for the key "_" is assigned with its other
     * corresponding keys to a new object, so that it will return an array of the same shape
     * as other similar node data without the key "_".
     */
    if ( packagedNode[`_`] ) {

        const nodeDataValue = {value: packagedNode[`_`]};

        packagedNode = {att: Object.assign(packagedNode.att, nodeDataValue)};
    }

    return packagedNode;
}

/**
 * Builds a FE-compatible model of the study consent groups.
 *
 * @param consents
 */
function buildStudyConsentGroups(consents) {

    /* Consent groups, normalize. */
    const consentsNormalized = normalizeNodeData(consents);

    /* Build the consent groups. */
    if ( consentsNormalized ) {

        return consentsNormalized.map(consent => {

            const {groupNum, longName, shortName} = consent;

            return {
                groupNum: Number(groupNum),
                longName: longName,
                shortName: shortName
            }
        });
    }
}

/**
 * Builds diseases from the "vocab_term".
 *
 * @param diseases
 */
function buildStudyDiseases(diseases) {

    if ( diseases ) {

        return diseases.map(disease => disease.vocab_term);
    }
}

/**
 * Builds a FE-compatible model of subject consents.
 *
 * @param consents
 * @param consentsStat
 * @param consentsId
 * @returns {{consents, consentsId: *, consentsStat: number}}
 */
function buildSubjectConsents(consents, consentsStat, consentsId) {

    if ( consents ) {

        const consentsByEnum = consents.map(consent => {

            return {
                consentCode: Number(consent.code),
                consentName: consent.value,
                consentStat: Number(consent.count)
            }
        });

        return {
            consents: consentsByEnum,
            consentsId: consentsId,
            consentsStat: Number(consentsStat),
        }
    }
}

/**
 * Fetches the GapId index page specified by URL and returns corresponding raw HTML.
 *
 * @param url
 * @returns {Promise.<*>}
 */
async function fetchIndex(url) {

    try {

        const parser = new DomParser();
        let fetchXML = await fetch(url);
        let html = await fetchXML.text();
        return await parser.parseFromString(html, "text/html");
    }
    catch(err) {

        console.log(`Error fetching ${url}`);
    }
}

/**
 * Fetches GapId XML page specified by URL and returns corresponding raw JSON.
 *
 * @param url
 * @returns {Promise.<*>}
 */
async function fetchXML(url) {

    try {

        let fetchXML = await fetch(url);
        const XMLToText = await fetchXML.text();
        return await parseXML(XMLToText);
    }
    catch(err) {

        console.log(`Error fetching ${url}`);
    }
}

/**
 * Returns the variable id for the "CONSENT" variable tag.
 *
 * @param variables
 * @returns {string}
 */
function getDictionaryConsentId(variables) {

    if ( !variables ) {

        return "";
    }

    /* Find the "CONSENT" <variable> tag. */
    const variableByConsent = variables.find(variable => variable.name === "CONSENT");

    if ( variableByConsent ) {

        return variableByConsent.att.id;
    }
}

/**
 * Returns the subject consents.
 *
 * @param variables
 * @returns {Array}
 */
function getSubjectVariablesByConsent(variables) {

    /* Find all <variable> with var_name "CONTENTS". */
    const consents = variables.filter(variable => variable.att.var_name.toLowerCase() === "consent");

    if ( !consents ) {

        return [];
    }

    const subjectConsents = consents.map(consent => {

        const {att, total} = consent,
            {id} = att,
            {stats} = total,
            {enum: consents, stat} = stats;

        /* Attributes - stat count var "n". */
        const n = stat.att.n;

        /* Consent groups, normalize and build. */
        const consentsNormalized = normalizeNodeData(consents);
        return buildSubjectConsents(consentsNormalized, n, id);
    });

    return subjectConsents.filter(consent => !!consent);
}

/**
 * Normalize any object to an array.
 *
 * @param values
 * @returns {Array}
 */
function normalizeNodeData(values) {

    if ( !values ) {

        return [];
    }

    /* Normalize object to an array. Return array reformatted to handle any node data with key "_". */
    if ( !Array.isArray(values) ) {

        let nodeData = assignNodeValue(values);

        return Object.keys(nodeData).map((key) => {

            return nodeData[key];
        })
    }

    /* Node data is already an array. Return array reformatted to handle any node data with key "_". */
    return values.map(value => {

        let nodeData = assignNodeValue(value);

        return nodeData.att;
    });
}

/**
 * Parses XML to raw JSON.
 *
 * @param xml
 * @returns {Promise}
 */
function parseXML(xml) {

    return new Promise((resolve, reject) => {

        parseString(xml, ({async: true, attrkey: "att", explicitArray: false, normalize: true, trim: true}), (err, result) => {

            if (err) {

                reject(err);
            }
            else {

                resolve(result);
            }
        });
    });
}

module.exports.buildDict = buildDict;
module.exports.buildExchange = buildExchange;
module.exports.buildReport = buildReport;
module.exports.getXMLUrls = getXMLUrls;
