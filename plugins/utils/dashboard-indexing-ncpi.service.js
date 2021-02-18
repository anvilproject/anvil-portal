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
const {getIndexFieldConsentShortNames, getIndexFieldDataTypes, getIndexFieldDiseases, getIndexFieldGapNumber, getIndexFieldStudyName} = require(path.resolve(__dirname, "./dashboard-index-field.service.js"));

/**
 * Generates the lunr search index for the NCPI dashboard.
 *
 * @param studies
 */
const generateNCPIDashboardIndex = function generateNCPIDashboardIndex(studies) {

    /* Add the studies to the search index. */
    const dashboardIndex = lunr(function () {

        this.ref("dbGapIdAccession");
        this.field("consentShortNames");
        this.field("dataTypes");
        this.field("dbGapIdNumber");
        this.field("diseases");
        this.field("platform");
        this.field("studyName");

        this.pipeline.remove(lunr.stemmer);
        this.searchPipeline.remove(lunr.stemmer);

        studies.forEach(study => {

            const consentShortNames = getIndexFieldConsentShortNames(study.consentShortNames);
            const dataTypes = getIndexFieldDataTypes(study.dataTypes);
            const dbGapIdNumber = getIndexFieldGapNumber(study.dbGapIdAccession);
            const diseases = getIndexFieldDiseases(study.diseases);
            const platform = study.platform;
            const studyName = getIndexFieldStudyName(study.studyName);

            this.add({
                "consentShortNames": consentShortNames,
                "dataTypes": dataTypes,
                "dbGapIdAccession": study.dbGapIdAccession,
                "dbGapIdNumber": dbGapIdNumber,
                "diseases": diseases,
                "platform": platform,
                "studyName": studyName,
            });
        });
    });

    fs.writeFileSync("static/dashboard-index-ncpi.json", JSON.stringify(dashboardIndex));
};

module.exports.generateNCPIDashboardIndex = generateNCPIDashboardIndex;
