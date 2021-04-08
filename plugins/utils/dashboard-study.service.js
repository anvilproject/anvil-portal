/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for dashboard study.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {getExchangeStudyName, getUrlExchange} = require(path.resolve(__dirname, "./dashboard-xml.service.js"));

/**
 * Returns a FE compatible model of dbGapId / dbGapIdAccession, comprising of either ID value
 * and a corresponding study url (if it exists).
 *
 * @param gapAccession
 * @param studyUrl
 * @returns {{gapIdDisplay: *, studyUrl: string}}
 */
const buildGapId = function buildGapId(gapAccession, studyUrl = "") {

    return {
        gapIdDisplay: gapAccession,
        studyUrl: studyUrl
    }
};

/**
 * Returns the study name from the XML Gap Exchange, for the specified dbGapIdAccession.
 *
 * @param gapId
 * @param gapAccession
 * @returns {Promise.<*>}
 */
const getStudyName = async function getStudyName(gapId, gapAccession) {

    if ( gapAccession ) {

        /* Grab the gap exchange URL. */
        const urlExchange = getUrlExchange(gapId, gapAccession);

        /* Return the study name. */
        return await getExchangeStudyName(urlExchange);
    }

    return "";
};

module.exports.buildGapId = buildGapId;
module.exports.getStudyName = getStudyName;
