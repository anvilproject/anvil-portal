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
const {
  getIndexFieldGapNumber,
  getIndexFieldTypeOfArray,
  getIndexFieldTypeOfString,
} = require(path.resolve(__dirname, "./dashboard-index-field.service.js"));

/**
 * Generates the lunr search index for the AnVIL dashboard.
 *
 * @param workspaces
 */
const generateAnVILDashboardIndex = function generateAnVILDashboardIndex(
  workspaces
) {
  /* Add the workspace to the search index. */
  const dashboardIndex = lunr(function () {
    this.ref("projectId");
    this.field("accessType");
    this.field("consentShortName");
    this.field("consortium");
    this.field("dataTypes");
    this.field("dataUseLimitations");
    this.field("dataUseLimitationModifiers");
    this.field("dbGapId");
    this.field("dbGapIdAccession");
    this.field("dbGapIdNumber");
    this.field("diseases");
    this.field("diseaseSpecificDataUseLimitations");
    this.field("projectId");
    this.field("studyDesigns");
    this.field("studyName");
    this.field("workspaceName");

    this.pipeline.remove(lunr.stemmer);
    this.searchPipeline.remove(lunr.stemmer);

    /* Special character replacement string options. */
    const facetSubStr = "_";
    const inputSubStr = " ";

    workspaces.forEach((workspace) => {
      const accessType = getIndexFieldTypeOfString(
        workspace.accessType,
        facetSubStr
      );
      const consentShortName = getIndexFieldTypeOfString(
        workspace.consentShortName,
        facetSubStr
      );
      const consortium = getIndexFieldTypeOfString(
        workspace.consortium,
        facetSubStr
      );
      const dataTypes = getIndexFieldTypeOfArray(workspace.dataTypes);
      const dataUseLimitations = getIndexFieldTypeOfArray(
        workspace.dataUseLimitations
      );
      const dataUseLimitationModifiers = getIndexFieldTypeOfArray(
        workspace.dataUseLimitationModifiers
      );
      const dbGapId = workspace.dbGapId;
      const dbGapIdAccession = workspace.dbGapIdAccession;
      const dbGapIdNumber = getIndexFieldGapNumber(workspace.dbGapId);
      const diseases = getIndexFieldTypeOfArray(workspace.diseases);
      const diseaseSpecificDataUseLimitations = getIndexFieldTypeOfArray(
        workspace.diseaseSpecificDataUseLimitations
      );
      const projectId = workspace.projectId;
      const studyDesigns = getIndexFieldTypeOfArray(workspace.studyDesigns);
      const studyName = getIndexFieldTypeOfString(
        workspace.studyName,
        inputSubStr
      );
      const workspaceName = getIndexFieldTypeOfString(
        workspace.projectId,
        inputSubStr
      );

      this.add({
        accessType: accessType,
        consentShortName: consentShortName,
        consortium: consortium,
        dataTypes: dataTypes,
        dataUseLimitations: dataUseLimitations,
        dataUseLimitationModifiers: dataUseLimitationModifiers,
        dbGapId: dbGapId,
        dbGapIdAccession: dbGapIdAccession,
        dbGapIdNumber: dbGapIdNumber,
        diseases: diseases,
        diseaseSpecificDataUseLimitations: diseaseSpecificDataUseLimitations,
        projectId: projectId,
        studyDesigns: studyDesigns,
        studyName: studyName,
        workspaceName: workspaceName,
      });
    });
  });

  fs.writeFileSync(
    "static/dashboard-index-anvil.json",
    JSON.stringify(dashboardIndex)
  );
};

module.exports.generateAnVILDashboardIndex = generateAnVILDashboardIndex;
