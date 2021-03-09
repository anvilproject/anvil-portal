/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for AnVIL dashboard search indexing.
 */

// Core dependencies
const fs = require("fs");
const lunr = require("lunr");
const path = require("path");

// App dependencies
const {findStudy, getIndexFieldAccessType, getIndexFieldConsortiumName, getIndexFieldDataTypes, getIndexFieldDiseases, getIndexFieldGapNumber, getIndexFieldStudyName, getIndexFieldWorkspaceName} = require(path.resolve(__dirname, "./dashboard-index-field.service.js"));

/**
 * Generates the lunr search index for the AnVIL dashboard.
 *
 * @param workspaces
 * @param studies
 */
const generateAnVILDashboardIndex = function generateAnVILDashboardIndex(studies, workspaces) {

    /* Add the workspace to the search index. */
    const dashboardIndex = lunr(function () {

        this.ref("projectId");
        this.field("access");
        this.field("accessType");
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
            const study = findStudy(studies, workspace.dbGapIdAccession);

            const accessType = getIndexFieldAccessType(workspace, study);
            const consortium = getIndexFieldConsortiumName(workspace.consortium);
            const dataTypes = getIndexFieldDataTypes(workspace.dataTypes);
            const dbGapId = workspace.dbGapId;
            const dbGapIdAccession = study.dbGapIdAccession;
            const dbGapIdNumber = getIndexFieldGapNumber(workspace.dbGapId);
            const diseases = getIndexFieldDiseases(study.diseases, workspace.consortium);
            const studyName = getIndexFieldStudyName(study.studyName);
            const workspaceName = getIndexFieldWorkspaceName(workspace.projectId);

            this.add({
                "access": workspace.access,
                "accessType": accessType,
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

module.exports.generateAnVILDashboardIndex = generateAnVILDashboardIndex;
