/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for AnVIL ingested dashboard search indexing.
 */

// Core dependencies
const fs = require("fs");
const lunr = require("lunr");
const path = require("path");

// App dependencies
const {findStudy, getIndexFieldConsortiumName, getIndexFieldDataTypes, getIndexFieldDiseases, getIndexFieldGapNumber, getIndexFieldConsentShortNames, getIndexFieldStudyName, getIndexFieldWorkspaceName} = require(path.resolve(__dirname, "./dashboard-index-field.service.js"));

/**
 * Generates the lunr search index for the AnVIL dashboard.
 *
 * @param workspaces
 * @param studies
 */
const generateAnVILIngestedDashboardIndex = function generateAnVILIngestedDashboardIndex(studies, workspaces) {

    /* Add the workspace to the search index. */
    const dashboardIndex = lunr(function () {

        this.ref("projectId");
        this.field("accessType");
        this.field("consentShortNames");
        this.field("consortium");
        this.field("dataTypes");
        this.field("dbGapId");
        this.field("dbGapIdAccession");
        this.field("dbGapIdNumber");
        this.field("diseases");
        this.field("projectId");
        this.field("studyName");
        this.field("workspaceName");

        this.pipeline.remove(lunr.stemmer);
        this.searchPipeline.remove(lunr.stemmer);

        workspaces.forEach(workspace => {

            /* Find the study, if it exists. */
            const study = findStudy(studies, workspace.dbGapIdAccession, "dbGapIdAccession");

            const accessType = workspace.accessType.replace(/\s/g, "_"); // TODO
            const consentShortNames = getIndexFieldConsentShortNames(workspace.consentShortNames);
            const consortium = getIndexFieldConsortiumName(workspace.consortium);
            const dataTypes = getIndexFieldDataTypes(workspace.dataTypes);
            const dbGapId = workspace.dbGapId;
            const dbGapIdAccession = workspace.dbGapIdAccession;
            const dbGapIdNumber = getIndexFieldGapNumber(workspace.dbGapId);
            const diseases = getIndexFieldDiseases(workspace.diseases);
            const studyName = getIndexFieldStudyName(study.studyName);
            const workspaceName = getIndexFieldWorkspaceName(workspace.projectId);

            this.add({
                "accessType": accessType,
                "consentShortCodes": consentShortNames,
                "consortium": consortium,
                "dataTypes": dataTypes,
                "dbGapId" : dbGapId,
                "dbGapIdAccession": dbGapIdAccession,
                "dbGapIdNumber": dbGapIdNumber,
                "diseases": diseases,
                "projectId": workspace.projectId,
                "studyName": studyName,
                "workspaceName": workspaceName
            });
        });
    });

    fs.writeFileSync("static/dashboard-index-anvil.json", JSON.stringify(dashboardIndex));
};

module.exports.generateAnVILIngestedDashboardIndex = generateAnVILIngestedDashboardIndex;
