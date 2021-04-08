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
 * Returns the study name from gap exchange xml file.
 *
 * @param url
 * @returns {Promise.<string>}
 */
const getExchangeStudyName = async function getExchangeStudyName(url) {

    if ( url ) {

        const exchangeHTML = await fetchXML(url);

        if ( exchangeHTML ) {

            const {GaPExchange} = exchangeHTML,
                {Studies} = GaPExchange || {},
                {Study} = Studies || {},
                {Configuration} = Study || {},
                {StudyNameEntrez} = Configuration || {};

            return StudyNameEntrez;
        }
    }

    return "";
};

/**
 * Returns the study accession from dbGapId. If no study exists an empty string is returned.
 *
 * @param dbGapId
 * @returns {Promise.<*>}
 */
const getStudyAccession = async function getStudyAccession(dbGapId) {

    if ( dbGapId && !dbGapId.startsWith("phs") ) {

        return "";
    }

    /* Get the study url. */
    const studyUrl = getUrlStudy(dbGapId);
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
 * Returns the gap exchange url for the specified study accession.
 *
 * @param dbGapId
 * @param dbGapIdAccession
 * @returns {*}
 */
const getUrlExchange = function getUrlExchange(dbGapId, dbGapIdAccession) {

    if ( dbGapIdAccession ) {

        return `${ncbiPath}${dbGapId}/${dbGapIdAccession}/GapExchange_${dbGapIdAccession}.xml`;
    }

    return "";
};

/**
 * Returns the study url for the specified study accession.
 *
 * @param dbGapIdAccession
 * @returns {*}
 */
const getUrlStudy = function getUrlStudy(dbGapIdAccession) {

    if ( dbGapIdAccession ) {

        return `${studyPath}${dbGapIdAccession}`;
    }

    return "";
};

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

module.exports.getExchangeStudyName = getExchangeStudyName;
module.exports.getStudyAccession = getStudyAccession;
module.exports.getUrlExchange = getUrlExchange;
module.exports.getUrlStudy = getUrlStudy;
