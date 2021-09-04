/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for dashboard study.
 */

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
    studyUrl: studyUrl,
  };
};

module.exports.buildGapId = buildGapId;
