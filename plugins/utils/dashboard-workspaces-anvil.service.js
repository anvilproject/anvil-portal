/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for AnVIL dashboard workspaces data ingestion.
 */

// Core dependencies
const path = require("path");

// App dependencies
const { parseRows, readFile, splitContentToContentRows } = require(path.resolve(
  __dirname,
  "./dashboard-file-system.service.js"
));
const { sortDataByDuoTypes } = require(path.resolve(
  __dirname,
  "./dashboard-sort.service.js"
));
const { getStudyPropertiesById } = require(path.resolve(
  __dirname,
  "./dashboard-studies-anvil.service.js"
));
const { buildGapId } = require(path.resolve(
  __dirname,
  "./dashboard-study.service.js"
));

// Template variables
const COLUMN_VALUE = {
  TRUE: "TRUE",
  FALSE: "FALSE",
  UNSPECIFIED: "UNSPECIFIED",
};
const CONSENT_CODE = {
  CAO: "CAO",
  COL: "COL",
  DS: "DS",
  GRU: "GRU",
  GSO: "GSO",
  HMB: "HMB",
  IRB: "IRB",
  MDS: "MDS",
  NA: "NA",
  NPU: "NPU",
  PUB: "PUB",
  NRES: "NRES",
  TBD: "TBD",
  UNSPECIFIED: "UNSPECIFIED",
};
const CONSENT_CODE_DISPLAY_TERM = {
  ...CONSENT_CODE,
  CAO: "Consortia Access Only",
  COL: "Collaboration Required (COL)",
  DS: "Disease Specific (DS)",
  GRU: "General Research Use (GRU)",
  GSO: "Genetic Studies Only (GSO)",
  HMB: "Health/Medical/Biomedical (HMB)",
  IRB: "IRB Approval Required (IRB)",
  MDS: "Methods Development Allowed (MDS)",
  NPU: "Not-for Profit Use Only (NPU))",
  NRES: "No Restrictions",
  PUB: "Publication Required (PUB)",
  UNSPECIFIED: "Unspecified",
};
const CONSENT_CODE_LIMITATIONS = [CONSENT_CODE.GRU, CONSENT_CODE.HMB];
const CONSENT_CODE_MODIFIERS = [
  CONSENT_CODE.COL,
  CONSENT_CODE.GSO,
  CONSENT_CODE.IRB,
  CONSENT_CODE.NPU,
  CONSENT_CODE.MDS,
  CONSENT_CODE.PUB,
];
const fileSourceAnVIL = "dashboard-source-anvil.tsv";
const SOURCE_HEADER_KEY = {
  CAO: "cao",
  COL: "col",
  CONSENT_LONG_NAME: "consentlongname",
  CONSENT_SHORT_NAME: "library:datauserestriction",
  CONSORTIUM: "consortium",
  CREATED_AT: "created",
  DATA_TYPES: "library:datatype",
  DB_GAP_ID: "phsid",
  DISEASES: "library:indication",
  DISEASE_TEXT: "diseasetext",
  DS: "ds",
  GRU: "gru",
  GSO: "gso",
  HMB: "hmb",
  IRB: "irb",
  MDS: "mds",
  NPU: "npu",
  NRES: "nres",
  PARTICIPANTS: "participantcount",
  PUB: "pub",
  PROJECT_ID: "name",
  SAMPLES: "samplecount",
  SIZE: "bucketsize",
  STUDY_DESIGNS: "library:studydesign",
  SUBJECTS: "subjectcount",
};
const SOURCE_FIELD_KEY = {
  ACCESS_TYPE: "accessType",
  [SOURCE_HEADER_KEY.CAO]: "cao",
  [SOURCE_HEADER_KEY.COL]: "col",
  [SOURCE_HEADER_KEY.CONSENT_LONG_NAME]: "consentLongName",
  CONSENT_NAME: "consentName",
  [SOURCE_HEADER_KEY.CONSENT_SHORT_NAME]: "consentShortName",
  [SOURCE_HEADER_KEY.CONSORTIUM]: "consortium",
  [SOURCE_HEADER_KEY.CREATED_AT]: "createdAt",
  [SOURCE_HEADER_KEY.DATA_TYPES]: "dataTypes",
  DATA_USE_LIMITATION_MODIFIERS: "dataUseLimitationModifiers",
  DATA_USE_LIMITATION: "dataUseLimitation",
  DATA_USE_LIMITATIONS: "dataUseLimitations",
  [SOURCE_HEADER_KEY.DB_GAP_ID]: "dbGapId",
  DB_GAP_ID_ACCESSION: "dbGapIdAccession",
  [SOURCE_HEADER_KEY.DISEASES]: "diseases",
  DISEASE_SPECIFIC_DATA_USE_LIMITATION: "diseaseSpecificDataUseLimitation",
  [SOURCE_HEADER_KEY.DISEASE_TEXT]: "diseaseText",
  [SOURCE_HEADER_KEY.DS]: "ds",
  GAP_ID: "gapId",
  [SOURCE_HEADER_KEY.GRU]: "gru",
  [SOURCE_HEADER_KEY.GSO]: "gso",
  [SOURCE_HEADER_KEY.HMB]: "hmb",
  [SOURCE_HEADER_KEY.IRB]: "irb",
  [SOURCE_HEADER_KEY.MDS]: "mds",
  [SOURCE_HEADER_KEY.NPU]: "npu",
  [SOURCE_HEADER_KEY.NRES]: "nres",
  [SOURCE_HEADER_KEY.PARTICIPANTS]: "participants",
  [SOURCE_HEADER_KEY.PUB]: "pub",
  [SOURCE_HEADER_KEY.PROJECT_ID]: "projectId",
  [SOURCE_HEADER_KEY.SAMPLES]: "samples",
  [SOURCE_HEADER_KEY.SIZE]: "size",
  [SOURCE_HEADER_KEY.STUDY_DESIGNS]: "studyDesigns",
  [SOURCE_HEADER_KEY.SUBJECTS]: "subjects",
};
const SOURCE_FIELD_TYPE = {
  [SOURCE_HEADER_KEY.CAO]: "string",
  [SOURCE_HEADER_KEY.COL]: "string",
  [SOURCE_HEADER_KEY.CONSENT_LONG_NAME]: "string",
  [SOURCE_HEADER_KEY.CONSENT_SHORT_NAME]: "string",
  [SOURCE_HEADER_KEY.CONSORTIUM]: "string",
  [SOURCE_HEADER_KEY.CREATED_AT]: "string",
  [SOURCE_HEADER_KEY.DATA_TYPES]: "array",
  [SOURCE_HEADER_KEY.DB_GAP_ID]: "string",
  [SOURCE_HEADER_KEY.DISEASES]: "array",
  [SOURCE_HEADER_KEY.DISEASE_TEXT]: "string",
  [SOURCE_HEADER_KEY.DS]: "string",
  [SOURCE_HEADER_KEY.GRU]: "string",
  [SOURCE_HEADER_KEY.GSO]: "string",
  [SOURCE_HEADER_KEY.HMB]: "string",
  [SOURCE_HEADER_KEY.IRB]: "string",
  [SOURCE_HEADER_KEY.MDS]: "string",
  [SOURCE_HEADER_KEY.NPU]: "string",
  [SOURCE_HEADER_KEY.NRES]: "string",
  [SOURCE_HEADER_KEY.PARTICIPANTS]: "number",
  [SOURCE_HEADER_KEY.PUB]: "string",
  [SOURCE_HEADER_KEY.PROJECT_ID]: "string",
  [SOURCE_HEADER_KEY.SAMPLES]: "number",
  [SOURCE_HEADER_KEY.SIZE]: "number",
  [SOURCE_HEADER_KEY.STUDY_DESIGNS]: "array",
  [SOURCE_HEADER_KEY.SUBJECTS]: "number",
};
const WORKSPACE_ACCESS_TYPE = {
  CONSORTIUM_ACCESS_ONLY: "Consortium Access Only",
  CONTROLLED_ACCESS: "Controlled Access",
  NO_RESTRICTIONS: "No Restrictions",
};
const WORKSPACE_CONSORTIUM = {
  "1000G": "1000 Genomes",
};

/**
 * Returns the AnVIL workspaces from ingested data.
 *
 * @returns {Promise.<void>}
 */
const getWorkspaces = async function getWorkspaces() {
  /* Build the workspace attributes. */
  const attributeWorkspaces = await parseSource(fileSourceAnVIL, "\t");

  /* Create a map object key-value pair of study accession by study id. */
  const studyPropertiesById = await getStudyPropertiesById(attributeWorkspaces);

  /* Merge the workspace data and build any additional rule based data, and associated study properties. */
  const workspaces = buildWorkspaces(attributeWorkspaces, studyPropertiesById);

  /* Return the sorted dashboard, sorted first by consortium, then by project name. */
  const keyConsortium = SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.CONSORTIUM];
  const keyProjectId = SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.PROJECT_ID];

  return sortDataByDuoTypes(workspaces, keyConsortium, keyProjectId);
};

/**
 * Returns the access type for the specified workspace.
 * - "No Restrictions" for any workspace consentShortName as "NRES".
 * - "Consortium Access Only" for any workspace without a study or consentShortName as either "NA" or "Consortia Access Only".
 * - "Controlled Access" for any workspace with a study, and with any consentShortName other than "Consortia Access Only", "NA" or "NRES".
 * @param workspace
 * @param consentShortName
 * @param studyAccession
 * @returns {{}}
 */
function buildWorkspacePropertyAccessType(
  workspace,
  consentShortName,
  studyAccession
) {
  const keyAccessType = SOURCE_FIELD_KEY.ACCESS_TYPE;

  /* If the workspace consentShortName is "NRES", the access type is "No Restrictions". */
  if (
    consentShortName &&
    consentShortName.toUpperCase() === CONSENT_CODE.NRES
  ) {
    return { [keyAccessType]: WORKSPACE_ACCESS_TYPE.NO_RESTRICTIONS };
  }

  /* If the workspace is without a study, the access type is "Consortium Access Only". */
  if (!studyAccession) {
    return { [keyAccessType]: WORKSPACE_ACCESS_TYPE.CONSORTIUM_ACCESS_ONLY };
  }

  /* If the workspace consentShortName is "NA", the access type is "Consortium Access Only". */
  if (consentShortName && consentShortName.toUpperCase() === CONSENT_CODE.NA) {
    return { [keyAccessType]: WORKSPACE_ACCESS_TYPE.CONSORTIUM_ACCESS_ONLY };
  }

  /* If the workspace consentShortName is "Consortia Access Only", the access type is "Consortium Access Only". */
  if (
    consentShortName &&
    consentShortName.toUpperCase() ===
      CONSENT_CODE_DISPLAY_TERM.CAO.toUpperCase()
  ) {
    return { [keyAccessType]: WORKSPACE_ACCESS_TYPE.CONSORTIUM_ACCESS_ONLY };
  }

  /* Otherwise, the access type is "Controlled Access". */
  /* This is true for any workspace with a study, and with any consentShortName other than "Consortia Access Only", "NA" or "NRES". */
  return { [keyAccessType]: WORKSPACE_ACCESS_TYPE.CONTROLLED_ACCESS };
}

/**
 * Returns the consent name (short and long) for the specified workspace.
 * @param workspace
 * @param consentShortName
 * @returns {{[p: string]: {short: *, long: *}}}
 */
function buildWorkspacePropertyConsentName(workspace, consentShortName) {
  const keyConsentName = SOURCE_FIELD_KEY.CONSENT_NAME;

  /* Grab the consent long code for the workspace. */
  let consentLongName =
    workspace[SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.CONSENT_LONG_NAME]];

  if (
    consentLongName.toUpperCase() === "UNSPECIFIED" ||
    consentLongName.toUpperCase().startsWith("ERROR")
  ) {
    consentLongName = "";
  }

  return {
    [keyConsentName]: { long: consentLongName, short: consentShortName },
  };
}

/**
 * Returns the data use limitation modifiers for the specified workspace.
 * @param row
 * @returns {{[p: string]: *[]}}
 */
function buildWorkspacePropertyDataUseLimitationModifiers(row) {
  const keyDataUseLimitationModifiers =
    SOURCE_FIELD_KEY.DATA_USE_LIMITATION_MODIFIERS;
  const workspaceModifiers = getWorkspaceDataUseLimitationModifiers(row);
  return { [keyDataUseLimitationModifiers]: workspaceModifiers };
}

/**
 * Returns the data use limitation for the specified workspace.
 * @param row
 * @returns {{[p: string]: *[]}}
 */
function buildWorkspacePropertyDataUseLimitation(row) {
  const keyDataUseLimitation = SOURCE_FIELD_KEY.DATA_USE_LIMITATION;
  const workspaceLimitation = getWorkspaceDataUseLimitation(row);
  return { [keyDataUseLimitation]: workspaceLimitation };
}

/**
 * Returns the data use limitations for the specified workspace.
 * @param propertyDataUseLimitation
 * @param propertyDiseaseSpecificDataUseLimitation
 * @returns {{[p: string]: [*, *]}}
 */
function getWorkspacePropertyDataUseLimitations(
  propertyDataUseLimitation,
  propertyDiseaseSpecificDataUseLimitation
) {
  const keyDataUseLimitations = SOURCE_FIELD_KEY.DATA_USE_LIMITATIONS;
  const dataUseLimitation =
    propertyDataUseLimitation[SOURCE_FIELD_KEY.DATA_USE_LIMITATION];
  const diseaseSpecifiedDataUseLimitation =
    propertyDiseaseSpecificDataUseLimitation[
      SOURCE_FIELD_KEY.DISEASE_SPECIFIC_DATA_USE_LIMITATION
    ];

  return {
    [keyDataUseLimitations]: [
      dataUseLimitation,
      diseaseSpecifiedDataUseLimitation,
    ],
  };
}

/**
 * Returns the disease specific data use limitation for the specified workspace.
 * @param row
 * @param diseaseSpecificTextByDiseaseSpecificCodes
 * @returns {{}}
 */
function buildWorkspacePropertyDiseaseSpecificDataUseLimitation(
  row,
  diseaseSpecificTextByDiseaseSpecificCodes
) {
  const keyDSDataUseLimitation =
    SOURCE_FIELD_KEY.DISEASE_SPECIFIC_DATA_USE_LIMITATION;
  const diseaseSpecificDataUseLimitationCode =
    row[SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.DS]];
  let diseaseSpecificDataUseLimitation = diseaseSpecificDataUseLimitationCode;
  if (
    diseaseSpecificDataUseLimitationCode.toUpperCase() ===
    CONSENT_CODE.UNSPECIFIED
  ) {
    return { [keyDSDataUseLimitation]: "" };
  }
  if (
    diseaseSpecificTextByDiseaseSpecificCodes.has(
      diseaseSpecificDataUseLimitationCode
    )
  ) {
    diseaseSpecificDataUseLimitation = `${diseaseSpecificTextByDiseaseSpecificCodes.get(
      diseaseSpecificDataUseLimitationCode
    )} (${diseaseSpecificDataUseLimitationCode})`;
  }
  return { [keyDSDataUseLimitation]: diseaseSpecificDataUseLimitation };
}

/**
 * Returns the gap id for the specified workspace.
 * The gap id comprises of db gap identifier or study accession identifier and any corresponding study url.
 *
 * @param studyId
 * @param studyAccession
 * @param studyUrl
 * @returns {{}}
 */
function buildWorkspacePropertyGapId(studyId, studyAccession, studyUrl) {
  const keyGapId = SOURCE_FIELD_KEY.GAP_ID;
  const identifier = studyAccession || studyId;
  const gapId = buildGapId(identifier, studyUrl);

  return { [keyGapId]: gapId };
}

/**
 * Returns the slug for the study detail page.
 *
 * @param studyId
 * @param studyAccession
 * @returns {{studySlug: string}}
 */
function buildWorkspacePropertyStudySlug(studyId, studyAccession) {
  let slug = "";
  if (studyAccession && studyId && studyId.startsWith("phs")) {
    slug = `/data/studies/${studyId}`;
  }
  return { studySlug: slug };
}

/**
 * Returns study request access url if access type is "controlled".
 *
 * @param propertyAccessType
 * @param studyId
 */
function buildWorkspacePropertyStudyRequestAccessUrl(
  propertyAccessType,
  studyId
) {
  /* Grab the access type for the workspace. */
  const accessType = propertyAccessType[SOURCE_FIELD_KEY.ACCESS_TYPE];

  /* Return the request access url with study id as the adddataset parameter. */
  let studyRequestAccessUrl = "";
  if (accessType === WORKSPACE_ACCESS_TYPE.CONTROLLED_ACCESS) {
    studyRequestAccessUrl = `https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?adddataset=${studyId}`;
  }
  return { studyRequestAccessUrl: studyRequestAccessUrl };
}

/**
 * Returns the workspace subjects count calculated from subjects count (or participants count if subjects count is undefined or zero).
 *
 * @param row
 * @param subjectsKey
 * @param participantsKey
 * @returns {{}}
 */
function getWorkspacePropertySubjectsCount(row, subjectsKey, participantsKey) {
  let count = row[subjectsKey];
  if (!count) {
    count = row[participantsKey] || 0;
  }
  return { [subjectsKey]: count };
}

/**
 * Returns the merged workspace data and any additional workspace properties of interest.
 *
 * @param attributeWorkspaces
 * @param studyPropertiesById
 */
function buildWorkspaces(attributeWorkspaces, studyPropertiesById) {
  const diseaseSpecificTextByDiseaseSpecificCodes =
    getDiseaseSpecificTextByDiseaseSpecificCodes(attributeWorkspaces);

  return attributeWorkspaces.reduce((acc, row) => {
    /* Grab the study id. */
    const studyId = getWorkspaceStudyId(row);

    /* Grab the corresponding study properties. */
    const propertyStudy = getWorkspaceStudy(studyId, studyPropertiesById),
      { dbGapIdAccession, studyUrl } = propertyStudy || {};

    /* Reformat the property consentShortName. */
    const propertyConsentShortName = reformatWorkspacePropertyValue(
      row,
      SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.CONSENT_SHORT_NAME]
    );

    /* Grab the consent short code for the workspace. */
    const consentShortName =
      propertyConsentShortName[
        SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.CONSENT_SHORT_NAME]
      ];

    /* Build the property consent name. */
    const propertyConsentName = buildWorkspacePropertyConsentName(
      row,
      consentShortName
    );

    /* Build the property dataUseLimitationModifiers. */
    const propertyDataUseLimitationModifiers =
      buildWorkspacePropertyDataUseLimitationModifiers(row);

    /* Build the property dataUseLimitation. */
    const propertyDataUseLimitation =
      buildWorkspacePropertyDataUseLimitation(row);

    /* Build the property accessType. */
    const propertyAccessType = buildWorkspacePropertyAccessType(
      row,
      consentShortName,
      dbGapIdAccession
    );

    /* Reformat the property consortium. */
    const propertyConsortium = reformatWorkspacePropertyConsortium(row);

    /* Reformat the property dataTypes. */
    const propertyDataTypes = reformatWorkspacePropertyList(
      row,
      SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.DATA_TYPES]
    );

    /* Reformat the property diseases. */
    const propertyDiseases = reformatWorkspacePropertyList(
      row,
      SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.DISEASES]
    );

    /* Build the property diseaseSpecificDataUseLimitation. */
    const propertyDiseaseSpecificDataUseLimitation =
      buildWorkspacePropertyDiseaseSpecificDataUseLimitation(
        row,
        diseaseSpecificTextByDiseaseSpecificCodes
      );

    /* Build the property diseaseSpecificDataUseLimitations. */
    const propertyDataUseLimitations = getWorkspacePropertyDataUseLimitations(
      propertyDataUseLimitation,
      propertyDiseaseSpecificDataUseLimitation
    );

    /* Build the property gapId. */
    const propertyGapId = buildWorkspacePropertyGapId(studyId, "", studyUrl);

    /* Reformat the property studyDesigns. */
    const propertyStudyDesigns = reformatWorkspacePropertyList(
      row,
      SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.STUDY_DESIGNS]
    );

    /* Build the property studyRequestAccessUrl (for the study detail page). */
    const propertyStudyRequestAccessUrl =
      buildWorkspacePropertyStudyRequestAccessUrl(
        propertyDataUseLimitation,
        studyId
      );

    /* Build the property studySlug (for the study detail page). */
    const propertyStudySlug = buildWorkspacePropertyStudySlug(
      studyId,
      dbGapIdAccession
    );

    /* Grab the property subjects or participants count. */
    const propertySubjects = getWorkspacePropertySubjectsCount(
      row,
      SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.SUBJECTS],
      SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.PARTICIPANTS]
    );

    /* Merge properties. */
    const workspace = {
      ...row,
      ...propertyAccessType,
      ...propertyConsentName,
      ...propertyConsentShortName,
      ...propertyDataUseLimitationModifiers,
      ...propertyDataUseLimitation,
      ...propertyDataUseLimitations,
      ...propertyConsortium,
      ...propertyDataTypes,
      ...propertyDiseases,
      ...propertyDiseaseSpecificDataUseLimitation,
      ...propertyGapId,
      ...propertySubjects,
      ...propertyStudyDesigns,
      ...propertyStudyRequestAccessUrl,
      ...propertyStudySlug,
      ...propertyStudy /* FHIR study values, should they exist, overwrite any corresponding properties from AnVIL. */,
    };

    /* Accumulate the workspace. */
    acc.push(workspace);

    return acc;
  }, []);
}

/**
 * Maps disease specific consent code with corresponding disease specific display text.
 * @param workspaces
 * @returns {Map<any, any>}
 */
function getDiseaseSpecificTextByDiseaseSpecificCodes(workspaces) {
  let diseaseSpecificTextByDiseaseSpecificCodes = new Map();
  for (const workspace of workspaces) {
    const diseaseCode = workspace[SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.DS]];
    /* Continue if the disease text has already been mapped. */
    if (diseaseSpecificTextByDiseaseSpecificCodes.has(diseaseCode)) continue;
    const diseaseText =
      workspace[SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.DISEASE_TEXT]];
    if (diseaseText) {
      diseaseSpecificTextByDiseaseSpecificCodes.set(diseaseCode, diseaseText);
    }
  }

  return diseaseSpecificTextByDiseaseSpecificCodes;
}

/**
 * Returns the data use limitation for the workspace.
 * @param row
 * @returns {string}
 */
function getWorkspaceDataUseLimitation(row) {
  const consentCode =
    row[SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.CONSENT_SHORT_NAME]];
  if (consentCode.toUpperCase() === CONSENT_CODE.TBD) {
    return consentCode;
  }
  /* Returns consent code that matches one of the consent code limitations. */
  let dataUseLimitation = "";
  for (const consentCode of CONSENT_CODE_LIMITATIONS) {
    const codeValue = row[SOURCE_FIELD_KEY[SOURCE_HEADER_KEY[consentCode]]];
    if (!codeValue) continue;
    if (codeValue.toUpperCase() === COLUMN_VALUE.TRUE) {
      dataUseLimitation = CONSENT_CODE_DISPLAY_TERM[consentCode];
      break;
    }
  }
  return dataUseLimitation;
}

/**
 * Returns the consent codes included in the specified list of modifiers for the workspace.
 * @param row
 * @returns {any[]}
 */
function getWorkspaceDataUseLimitationModifiers(row) {
  let setOfConsentCodes = new Set();
  for (const consentCode of CONSENT_CODE_MODIFIERS) {
    const codeValue = row[SOURCE_FIELD_KEY[SOURCE_HEADER_KEY[consentCode]]];
    if (!codeValue) continue;
    if (codeValue.toUpperCase() === COLUMN_VALUE.TRUE) {
      setOfConsentCodes.add(CONSENT_CODE_DISPLAY_TERM[consentCode]);
    }
  }
  return [...setOfConsentCodes];
}

/**
 * Returns the study for the specified workspace.
 *
 * @param studyId
 * @param studyPropertiesById
 * @returns {{dbGapIdAccession: string, studyName: string, studyUrl: string}|*}
 */
function getWorkspaceStudy(studyId, studyPropertiesById) {
  const study = studyPropertiesById.get(studyId);

  if (study) {
    return study;
  }

  return {
    dbGapIdAccession: "",
    // studyDesigns: [],
    studyName: "",
    studyUrl: "",
  };
}

/**
 * Returns the study id for the specified workspace.
 *
 * @param workspace
 * @returns {*}
 */
function getWorkspaceStudyId(workspace) {
  const keyStudyId = SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.DB_GAP_ID];

  return workspace[keyStudyId] || "";
}

/**
 * Returns the source data for the specified file.
 * Will only return properties matching any source header key.
 *
 * @param fileName
 * @param delimiter
 * @returns {Promise.<*[]>}
 */
async function parseSource(fileName, delimiter) {
  /* Read the AnVIL source file. */
  const content = await readFile(fileName, "utf8");

  /* Split the file content into rows. */
  const contentRows = splitContentToContentRows(content);

  /* Parse and return the ingested data. */
  return parseRows(contentRows, delimiter, SOURCE_FIELD_KEY, SOURCE_FIELD_TYPE);
}

/**
 * Returns the reformatted consortium workspace property.
 *
 * @param row
 * @returns {{}}
 */
function reformatWorkspacePropertyConsortium(row) {
  const keyConsortium = SOURCE_FIELD_KEY[SOURCE_HEADER_KEY.CONSORTIUM];
  const valueConsortium = row[keyConsortium];
  const consortium = WORKSPACE_CONSORTIUM[valueConsortium] || valueConsortium;
  return { [keyConsortium]: consortium };
}

/**
 * Returns the reformatted workspace property of type "array" for the specified key.
 *
 * @param row
 * @param key
 * @returns {{}}
 */
function reformatWorkspacePropertyList(row, key) {
  const values = row[key];
  const setOfValues = new Set(values);
  return { [key]: [...setOfValues] };
}

/**
 * Returns the reformatted workspace property of type "string" for the specified key.
 *
 * @param row
 * @param key
 * @returns {{}}
 */
function reformatWorkspacePropertyValue(row, key) {
  const value = row[key] || "";
  return { [key]: value };
}

module.exports.getWorkspaces = getWorkspaces;
