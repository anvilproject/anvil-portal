/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for NCPI dashboard search indexing.
 */

// Core dependencies
const fs = require("fs");
const lunr = require("lunr");
const path = require("path");

// App dependencies
const {
  getIndexFieldGapNumber,
  getIndexFieldTypeOfArray,
  getIndexFieldTypeOfString,
} = require(path.resolve(__dirname, "./dashboard-index-field.service.js"));

/**
 * Generates the lunr search index for the NCPI dashboard.
 *
 * @param studies
 */
const generateNCPIDashboardIndex = function generateNCPIDashboardIndex(
  studies
) {
  /* Add the studies to the search index. */
  const dashboardIndex = lunr(function () {
    this.ref("dbGapIdAccession");
    this.field("consentCodes");
    this.field("dataTypes");
    this.field("dbGapIdNumber");
    this.field("focuses");
    this.field("platforms");
    this.field("studyDesigns");
    this.field("studyName");

    this.pipeline.remove(lunr.stemmer);
    this.searchPipeline.remove(lunr.stemmer);

    /* Special character replacement string options. */
    const inputSubStr = " ";

    studies.forEach((study) => {
      const consentCodes = getIndexFieldTypeOfArray(study.consentCodes);
      const dataTypes = getIndexFieldTypeOfArray(study.dataTypes);
      const dbGapIdAccession = study.dbGapIdAccession;
      const dbGapIdNumber = getIndexFieldGapNumber(study.dbGapIdAccession);
      const focuses = getIndexFieldTypeOfArray(study.focuses);
      const platforms = study.platforms;
      const studyDesigns = getIndexFieldTypeOfArray(study.studyDesigns);
      const studyName = getIndexFieldTypeOfString(study.studyName, inputSubStr);

      this.add({
        consentCodes: consentCodes,
        dataTypes: dataTypes,
        dbGapIdAccession: dbGapIdAccession,
        dbGapIdNumber: dbGapIdNumber,
        focuses: focuses,
        platforms: platforms,
        studyDesigns: studyDesigns,
        studyName: studyName,
      });
    });
  });

  fs.writeFileSync(
    "static/dashboard-index-ncpi.json",
    JSON.stringify(dashboardIndex)
  );
};

module.exports.generateNCPIDashboardIndex = generateNCPIDashboardIndex;
