/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for parsing fetched xml into FE model.
 */

// Core dependencies
const fetch = require("node-fetch");
const {parseString} = require("xml2js");

// Template dependencies
const ncbiPath = "https://ftp.ncbi.nlm.nih.gov/dbgap/studies/";
const studyPath = "https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=";

/**
 * Builds the subject dictionary schema.
 * Includes the study accession and the consent phv id with the subject participation value.
 *
 * @param url
 * @returns {Promise.<{dbGapIdAccession: *, variableConsentId: string}>}
 */
const buildDict = async function buildDict(url) {

    if ( url ) {

        const dictHTML = await fetchXML(url);

        if ( dictHTML ) {

            const {data_table} = dictHTML,
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
        }
    }

    return {dbGapIdAccession: "", variableConsentId: ""}
};

/**
 * Build the study schema from gap exchange xml file.
 * Includes study accession, study name and diseases.
 *
 * @param url
 * @returns {Promise.<{consentGroups, dbGapIdAccession: *, diseases, name: {longName, shortName}}>}
 */
const buildExchange = async function buildExchange(url) {

    if ( url ) {

        const exchangeHTML = await fetchXML(url);

        if ( exchangeHTML ) {

            const {GaPExchange} = exchangeHTML,
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
        }
    }

    return {consentGroups: [], dbGapIdAccession: "", diseases: [], name: {longName: "", shortName: ""}};
};

/**
 * Build the subject report schema.
 * Includes study accession, study name, and the <variables> tags where var_name is "CONSENT".
 *
 * @param url
 * @returns {Promise.<*>}
 */
const buildReport = async function buildReport(url) {

    if ( url ) {

        const reportHTML = await fetchXML(url);

        if ( reportHTML ) {

            const {data_table} = reportHTML,
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
        }
    }

    return {dbGapIdAccession: "", name: "", variables: []}
};

/**
 * Returns the study accession from dbGapId. If no study exists an empty string is returned.
 *
 * @param dbGapId
 * @returns {Promise.<*>}
 */
const getStudyGapAccession = async function getStudyGapAccession(dbGapId) {

    if ( dbGapId && !dbGapId.startsWith("phs") ) {

        return "";
    }

    /* Get the study url. */
    const studyUrl = `${studyPath}${dbGapId}`;
    const regex = /.*?study_id=/gi;

    /* Return any redirected url. */
    /* Will also return empty string for any study that does not exist. */
    /* Site redirects to "https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=". */
    try {

        return await fetch(studyUrl)
            .then(response => {

                const redirected = response.redirected;

                if ( redirected ) {

                    return response.url.replace(regex, "");
                }
            });
    }
    catch(err) {

        console.log(`Error fetching ${studyUrl}`);
        return "";
    }
};

/**
 * Returns the XML urls (exchange, data_dict and var_report urls) for the specified dbGapIdAccession.
 *
 * @param dbGapIdAccession
 * @returns {Promise.<{dict: string, gapExchange: string, report: string}>}
 */
const getXMLUrls = async function getXMLUrls(dbGapIdAccession) {

    /* Initialize urls. */
    let dictURL = "";
    let exchangeURL = "";
    let reportURL = "";
    let studyURL = "";

    if ( dbGapIdAccession ) {

        /* Get the dbGapId from the accession. */
        const dbGapId = dbGapIdAccession.split(".")[0];

        /* Get the study url. */
        studyURL = `${studyPath}${dbGapIdAccession}`;

        /* Get the gap exchange url. */
        exchangeURL = `${ncbiPath}${dbGapId}/${dbGapIdAccession}/GapExchange_${dbGapIdAccession}.xml`;

        /* Grab the gap index page. */
        const indexURL = `${ncbiPath}${dbGapId}/${dbGapIdAccession}/pheno_variable_summaries/`;

        /* Grab all <a> from the index page. */
        const indexHTML = await fetchIndex(indexURL);

        /* Get the subject dictionary and report XML URLs, if the gap index page exists. */
        if ( indexHTML ) {

            const {html} = indexHTML,
                {body} = html,
                {pre} = body,
                {hr} = pre,
                {a} = hr;

            /* Grab the corresponding href attribute. */
            const indexRefs = a.filter(index => index.att).map(index => index.att.HREF);

            /* Find the dict and report URL reference. */
            const dictXMLRef = indexRefs.find(ref => ref.toLowerCase().includes("subject.data_dict"));
            const reportXMLRef = indexRefs.find(ref => ref.toLowerCase().includes("subject.var_report"));

            /* Subject dictionary and report XML URLs. */
            dictURL = `${ncbiPath}${dbGapId}/${dbGapIdAccession}/pheno_variable_summaries/${dictXMLRef}`;
            reportURL = `${ncbiPath}${dbGapId}/${dbGapIdAccession}/pheno_variable_summaries/${reportXMLRef}`;
        }
    }

    return {dict: dictURL, gapExchange: exchangeURL, report: reportURL, studyUrl: studyURL};
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

        const fetchIndex = await fetch(url);

        if ( fetchIndex.status === 200 ) {

            const html = await fetchIndex.text();
            return await parseHTML(html);
        }
        else {

            console.log(`Fetch status error: ${url}`);
        }
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

        if ( fetchXML.status === 200 ) {

            const XMLToText = await fetchXML.text();
            return await parseXML(XMLToText);
        }
        else {

            console.log(`Fetch status error: ${url}`);
        }
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
 * Parses HTML to raw JSON.
 *
 * This is a minor modification of function parseXML due to requiring strict mode as "false".
 * `sax-js` parses tag names to uppercase in this mode. Normalization of tags does not include the attributes "att"
 * and so a separate function has been created to parse the HTML.
 * See https://github.com/Leonidas-from-XIV/node-xml2js/issues/501.
 *
 * @param html
 * @returns {Promise}
 */
function parseHTML(html) {

    return new Promise((resolve, reject) => {

        parseString(html, ({async: true, attrkey: "att", explicitArray: false, normalize: true, normalizeTags: true, strict: false, trim: true}), (err, result) => {

            if (err) {

                reject(err);
            }
            else {

                resolve(result);
            }
        });
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
module.exports.getStudyGapAccession = getStudyGapAccession;
module.exports.getXMLUrls = getXMLUrls;
