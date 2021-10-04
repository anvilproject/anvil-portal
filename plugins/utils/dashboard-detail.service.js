/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting workspaces and or studies into FE model for the dashboard study (detail) page.
 */

// Core dependencies
const path = require("path");

// App dependencies
const { buildStats } = require(path.resolve(
  __dirname,
  "./dashboard-statistics.service.js"
));

/**
 * Returns the studies for the study detail page.
 *
 * @param workspaces
 * @returns {*[]}
 */
const buildStudiesDetail = function buildStudiesDetail(workspaces) {
  /* Build up the study for each study id. */
  const studyByStudyId = new Map();
  /* Loop through cloned workspaces. */
  for (const workspace of [...workspaces]) {
    /* Clone workspace. */
    const workspaceClone = Object.assign({}, workspace);
    const { dbGapId, studyName } = workspaceClone;
    if (studyName) {
      /* Grab the study. */
      let study = studyByStudyId.get(dbGapId);

      if (!study) {
        /* Build new study if required. */
        study = {
          fhirUrl: workspaceClone.fhirUrl,
          studyAccession: workspaceClone.dbGapIdAccession,
          studyConsortia: workspaceClone.consortium,
          studyDescription: workspaceClone.studyDescription,
          studyDescriptionShort: workspaceClone.studyDescriptionShort,
          studyId: dbGapId,
          studyName: workspaceClone.studyName,
          studyRequestAccessUrl: workspaceClone.studyRequestAccessUrl,
          studySlug: workspaceClone.studySlug,
          studyWorkspaces: [],
          studyUrl: workspaceClone.studyUrl,
        };

        studyByStudyId.set(dbGapId, study);
      }

      /* Remove the study related properties from the (cloned) workspace. */
      delete workspaceClone.consortium;
      delete workspaceClone.dbGapIdAccession;
      delete workspaceClone.dbGapId;
      delete workspaceClone.fhirUrl;
      delete workspaceClone.gapId;
      delete workspaceClone.studyDescription;
      delete workspaceClone.studyDescriptionShort;
      delete workspaceClone.studyName;
      delete workspaceClone.studyRequestAccessUrl;
      delete workspaceClone.studySlug;
      delete workspaceClone.studyUrl;

      /* Add workspace to study's workspaces. */
      study.studyWorkspaces.push(workspaceClone);
    }
  }

  /* Merge study stats and summary with study. */
  /* Stats and summary are calculated from the study workspaces. */
  for (const [studyId, study] of studyByStudyId) {
    const stat = buildStats(study.studyWorkspaces);
    const summary = buildStudySummary(study.studyWorkspaces);
    Object.assign(study, { studyStat: stat, studySummary: summary });
  }

  return [...studyByStudyId.values()];
};

/**
 * Returns the studies for the NCPI study detail page.
 * @param studies
 */
const buildNCPIStudiesDetail = function buildNCPIStudiesDetail(studies) {
  return studies.map((study) => {
    return {
      fhirUrl: study.fhirUrl,
      studyAccession: study.dbGapIdAccession,
      studyDescription: study.description,
      studyDescriptionShort: study.descriptionShort,
      studyId: study.gapId.gapIdDisplay,
      studyName: study.studyName,
      studyRequestAccessUrl: study.studyRequestAccessUrl,
      studySummary: {
        consentShortNames: study.consentCodes,
        dataTypes: study.dataTypes,
        focuses: study.focuses,
        studyDesigns: study.studyDesigns,
        studyPlatforms: study.platforms,
        subjectsTotal: study.subjectsTotal,
      },
      studySlug: study.studySlug,
      studyUrl: study.studyUrl,
    };
  });
};

/**
 * Returns the study summary.
 *
 * @param workspaces
 * @returns {{}}
 */
function buildStudySummary(workspaces) {
  /* Grab the workspace property names used to build the study summary. */
  const keys = [
    "accessType",
    "consentShortName",
    "dataTypes",
    "diseases",
    "studyDesigns",
  ];

  /* Build a relationship between workspace property names and summary names. */
  const SummaryKey = {
    accessType: "accessTypes",
    consentShortName: "consentShortNames",
  };

  const setOfValuesBySummaryKey = new Map();
  for (const workspace of workspaces) {
    for (const key of keys) {
      /* Grab the set of values by key and add to the set any new workspace values. */
      let setOfValues = setOfValuesBySummaryKey.get(key);

      if (!setOfValues) {
        setOfValues = new Set();
        setOfValuesBySummaryKey.set(key, setOfValues);
      }

      /* Handle case where value is not an array - make a single value an array of single length. */
      const workspaceValues = Array.isArray(workspace[key])
        ? workspace[key]
        : Array.of(workspace[key]);

      /* Add all values to the set of summary values. */
      workspaceValues.forEach((workspaceValue) => {
        if (workspaceValue !== "--") {
          setOfValues.add(workspaceValue);
        }
      });
    }
  }

  /* Build the study summary. */
  let summary = {};

  for (const [key, setOfValues] of setOfValuesBySummaryKey) {
    /* Assign the new summary property name. */
    const summaryKey = SummaryKey[key] || key;
    Object.assign(summary, { [summaryKey]: [...setOfValues] });
  }

  return summary;
}

module.exports.buildStudiesDetail = buildStudiesDetail;
module.exports.buildNCPIStudiesDetail = buildNCPIStudiesDetail;
