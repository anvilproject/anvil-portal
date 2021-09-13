/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for fetched FHIR JSON.
 */

// Core dependencies
const { decode } = require("html-entities");
const fetch = require("node-fetch");
const path = require("path");
const remark = require("remark");
const html = require("remark-html");

// App dependencies
const { readFile, writeFile } = require(path.resolve(
  __dirname,
  "./dashboard-file-system.service.js"
));

// Template variables
const dirCacheFHIR = "../../db-gap-cache";
const FHIR_FIELD_KEY = {
  CONSENT_CODES: "consentCodes",
  DATA_TYPES: "dataTypes",
  DESCRIPTION: "description",
  FOCUSES: "focuses",
  STUDY_DESIGNS: "studyDesigns",
  STUDY_NAME: "studyName",
  SUBJECTS_TOTAL: "subjectsTotal",
};
const urlPrefixFHIR =
  "https://dbgap-api.ncbi.nlm.nih.gov/fhir/x1/ResearchStudy?_id=";
const urlSuffixFHIR = "&_format=json";

/**
 * Builds the study from the FHIR JSON.
 *
 * @param dbGapIdAccession
 * @returns {Promise.<*>}
 */
const getFHIRStudy = async function getFHIRStudy(dbGapIdAccession) {
  /* Initialize study. */
  let study = initializeStudy();

  /* Grab the FHIR JSON. */
  const fhirJSON = await getFHIRJSON(dbGapIdAccession);

  /* Build the study. */
  const fhirStudy = buildFHIRStudy(fhirJSON, study);

  /* Cache the study for future use; if it has not already been stored. */
  if (fhirJSON && !fhirJSON.cacheHit) {
    await cacheFHIR(dbGapIdAccession, fhirJSON, fhirStudy);
  }

  return fhirStudy;
};

/**
 * Returns a FE model of study.
 *
 * @param fhirJSON
 * @param study
 * @returns {*}
 */
function buildFHIRStudy(fhirJSON, study) {
  if (fhirJSON) {
    const entries = fhirJSON.entry;

    /* Grab the study name and description and assign to the study. */
    const studyName = getStudyName(entries);
    const description = getStudyDescription(entries);
    const cloneStudy = Object.assign(study, {
      [FHIR_FIELD_KEY.STUDY_NAME]: studyName,
      [FHIR_FIELD_KEY.DESCRIPTION]: description,
    });

    return entries.reduce((acc, entry) => {
      /* Grab the resource extensions. */
      const { resource } = entry || {};

      /* Roll up the consent codes. */
      const consentCodes = rollUpConsentCodes(resource, acc);

      /* Roll up the molecular codes. */
      const dataTypes = rollUpDataTypes(resource, acc);

      /* Roll up the focus (diseases). */
      const focuses = rollUpFocuses(resource, acc);

      /* Roll up the study designs. */
      const studyDesigns = rollUpStudyDesigns(resource, acc);

      /* Roll up subjects total. */
      const subjectsTotal = rollUpSubjectsTotal(resource, acc);

      /* Accumulate the values. */
      return Object.assign(acc, {
        [FHIR_FIELD_KEY.CONSENT_CODES]: consentCodes,
        [FHIR_FIELD_KEY.DATA_TYPES]: dataTypes,
        [FHIR_FIELD_KEY.FOCUSES]: focuses,
        [FHIR_FIELD_KEY.STUDY_DESIGNS]: studyDesigns,
        [FHIR_FIELD_KEY.SUBJECTS_TOTAL]: subjectsTotal,
      });
    }, cloneStudy);
  }

  return study;
}

/**
 * Caches the FHIR JSON.
 *
 * @param dbGapIdAccession
 * @param fhirJSON
 * @param fhirStudy
 * @returns {Promise.<void>}
 */
async function cacheFHIR(dbGapIdAccession, fhirJSON, fhirStudy) {
  if (isFHIRComplete(fhirStudy)) {
    const file = `${dirCacheFHIR}/${dbGapIdAccession}.json`;

    /* Cache the FHIR JSON. */
    /* If the file exists, it will not be re-cached. */
    /* See https://nodejs.org/api/fs.html#fs_file_system_flags {"flag": "wx"}. */
    await writeFile(file, JSON.stringify(fhirJSON), { flag: "wx" });
  } else {
    console.log(
      `FHIR response incomplete and will not be cached for ${dbGapIdAccession}`
    );
  }
}

/**
 * Fetches FHIR page specified by URL and returns corresponding raw JSON.
 *
 * @param dbGapIdAccession
 * @returns {Promise.<*>}
 */
async function fetchFHIRJSON(dbGapIdAccession) {
  const url = `${urlPrefixFHIR}${dbGapIdAccession}${urlSuffixFHIR}`;
  const response = await fetch(url);
  const status = response.status;

  /* Parse the response. */
  if (status === 200) {
    return await parseFHIRJSON(dbGapIdAccession, response);
  } else {
    console.log(`FHIR fetch status error ${status} for ${url}`);
  }
}

/**
 * Returns the resource extension specified by extension type.
 *
 * @param resource
 * @param stringSnippet
 * @returns {{}}
 */
function findExtensionType(resource, stringSnippet = "") {
  const resourceExtensions = resource.extension;

  if (resourceExtensions) {
    return resourceExtensions.find((extensions) => {
      const { url } = extensions;

      if (url) {
        const subStr = stringSnippet.toLowerCase();

        return url.toLowerCase().includes(subStr);
      }

      return false;
    });
  }
}

/**
 * Returns FHIR JSON.
 * JSON will be sourced from cache. If the JSON is not cached, then the JSON is fetched.
 *
 * @returns {Promise.<*>}
 * @param dbGapIdAccession
 */
async function getFHIRJSON(dbGapIdAccession) {
  /* Grab the FHIR study JSON from cache. */
  let fhirJSON = await readCacheFHIR(dbGapIdAccession);
  let cacheHit = true;

  if (!fhirJSON) {
    /* Otherwise, fetch the FHIR study JSON. */
    fhirJSON = await fetchFHIRJSON(dbGapIdAccession);
    cacheHit = false;

    if (!fhirJSON) {
      return fhirJSON; // Returning null if json is not cached and not complete in dbGap.
    }
  }

  return Object.assign(fhirJSON, { cacheHit: cacheHit });
}

/**
 * Returns a list of system design codes belonging to the specified system type.
 *
 * @param coding
 * @param systemType
 * @returns {*[]}
 */
function getDesignCodes(coding, systemType) {
  if (coding) {
    return coding.reduce((acc, designCode) => {
      const { code, system } = designCode;

      if (system && isStrPartialMatch(system, systemType)) {
        acc.push(code);
      }

      return acc;
    }, []);
  }

  return [];
}

/**
 * Returns the molecular data types.
 *
 * @param coding
 * @returns {Array}
 */
function getMolecularCodes(coding) {
  if (coding) {
    return coding.reduce((acc, molecularCode) => {
      const { code } = molecularCode;

      return acc.concat(code);
    }, []);
  }

  return [];
}

/**
 * Returns the study description in markdown formatted text.
 *
 * @param entries
 * @returns {vfile.VFileContents|string}
 */
function getStudyDescription(entries) {
  /* Grab the first entry's resource property. */
  const entry = entries[0];
  const resource = entry?.resource;

  if (resource) {
    const rawDescription = resource.description;
    if (rawDescription) {
      /* Replace any `\t` (tab) with a space - avoids markdown processing tab as <pre/>. */
      /* Replace any dbGap internal links with an external link to the dbGap study. */
      const parsedDescription = rawDescription
        .replace(/\t/g, " ")
        .replace(
          /study.cgi\?study_id=|.\/study.cgi\?study_id=/g,
          "https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id="
        );
      return remark().use(html).processSync(parsedDescription).contents;
    }
  }
  return "";
}

/**
 * Returns the study name associated with the first entry.
 * Any subsequent entries are ignored.
 *
 * @returns {string}
 * @param entries
 */
function getStudyName(entries) {
  /* Grab the first entry's resource property. */
  const entry = entries[0];
  const resource = entry.resource;

  if (resource) {
    const title = resource.title;

    /* Return study name. */
    if (title) {
      return decode(title);
    }
  }

  return "";
}

/**
 * Returns the initialized study object.
 *
 * @returns {{}}
 */
function initializeStudy() {
  return {
    [FHIR_FIELD_KEY.CONSENT_CODES]: [],
    [FHIR_FIELD_KEY.DATA_TYPES]: [],
    [FHIR_FIELD_KEY.DESCRIPTION]: "",
    [FHIR_FIELD_KEY.FOCUSES]: [],
    [FHIR_FIELD_KEY.STUDY_DESIGNS]: [],
    [FHIR_FIELD_KEY.STUDY_NAME]: "",
    [FHIR_FIELD_KEY.SUBJECTS_TOTAL]: 0,
  };
}

/**
 * Returns true if the specified extension type string is in the specified url.
 *
 * @param url
 * @param extensionType
 * @returns {boolean}
 */
function isExtensionType(url, extensionType = "") {
  if (url) {
    const extensionStr = extensionType.toLowerCase();
    const urlStr = url.toLowerCase();

    return urlStr.includes(extensionStr);
  }

  return false;
}

/**
 * Returns true if the FHIR study has a valid name and subjects total.
 *
 * @param study
 * @returns {*}
 */
function isFHIRComplete(study) {
  return study.studyName && study.subjectsTotal;
}

/**
 * Returns true if the specified search string partially matches the specified string.
 *
 * @param str
 * @param searchStr
 * @returns {boolean}
 */
function isStrPartialMatch(str, searchStr) {
  if (str) {
    const lowerCStr = str.toLowerCase();
    const lowerCSearchStr = searchStr.toLowerCase();

    return lowerCStr.includes(lowerCSearchStr);
  }

  return false;
}

/**
 * Returns parsed FHIR JSON.
 *
 * @param dbGapIdAccession
 * @param response
 * @returns {Promise<{entry}|*>}
 */
async function parseFHIRJSON(dbGapIdAccession, response) {
  /* Grab the JSON. */
  const json = await response.json();

  /* Only return valid FHIR JSON. */
  if (json && json.entry) {
    return json;
  }
}

/**
 * Returns the cached FHIR JSON.
 *
 * @param dbGapIdAccession
 * @returns {Promise.<*>}
 */
async function readCacheFHIR(dbGapIdAccession) {
  /* Grab the FHIR content from cache. */
  const file = `${dirCacheFHIR}/${dbGapIdAccession}.json`;
  const content = await readFile(file);

  /* Return the JSON. */
  if (content) {
    return await JSON.parse(content);
  }
}

/**
 * Returns the consent codes for the study.
 *
 * @param resource
 * @param acc
 * @returns {*}
 */
function rollUpConsentCodes(resource, acc) {
  /* Define the extension type of interest. */
  const extensionType = "ResearchStudy-StudyConsents";

  /* Grab any accumulated consent codes. */
  const consentCodes = acc[FHIR_FIELD_KEY.CONSENT_CODES];

  if (resource) {
    /* Find the resource extensions for the study consents; the url ends with ~ResearchStudy-StudyConsents. */
    const studyConsents = findExtensionType(resource, extensionType);

    if (studyConsents) {
      const { extension } = studyConsents;

      if (extension) {
        return extension.reduce((acc, node) => {
          const { valueCoding } = node || {},
            { display } = valueCoding || {};

          return acc.concat(display);
        }, consentCodes);
      }
    }
  }

  return consentCodes;
}

/**
 * Returns the molecular data types for the study.
 *
 * @param resource
 * @param acc
 * @returns {Array}
 */
function rollUpDataTypes(resource, acc) {
  /* Define the extension type of interest. */
  const extensionType = "MolecularDataTypes";

  /* Grab any accumulated data types. */
  const dataTypes = acc[FHIR_FIELD_KEY.DATA_TYPES];

  if (resource) {
    /* Find the resource extensions for the molecular data types; the url ends with ~MolecularDataTypes. */
    const molecularDataType = findExtensionType(resource, extensionType);

    if (molecularDataType) {
      const { extension } = molecularDataType;

      if (extension) {
        return extension.reduce((acc, node) => {
          const { valueCodeableConcept } = node || {},
            { coding } = valueCodeableConcept || {};

          const codes = getMolecularCodes(coding);

          return acc.concat(codes);
        }, dataTypes);
      }
    }
  }

  return dataTypes;
}

/**
 * Returns the focuses (diseases), rolled up from focus field's text field.
 *
 * @param resource
 * @param acc
 * @returns {*}
 */
function rollUpFocuses(resource, acc) {
  /* Grab any accumulated focuses. */
  const accFocuses = acc[FHIR_FIELD_KEY.FOCUSES];

  if (resource) {
    /* Grab the focus array. */
    const focuses = resource.focus;

    if (focuses) {
      return focuses.reduce((acc, focus) => {
        const { text } = focus || {};
        acc.push(text);

        return acc;
      }, accFocuses);
    }
  }

  return accFocuses;
}

/**
 * Returns the study designs for the study.
 *
 * @param resource
 * @param acc
 * @returns {*}
 */
function rollUpStudyDesigns(resource, acc) {
  /* Define the system type of interest. */
  const systemType = "ResearchStudy-StudyDesign";

  /* Grab any accumulated study designs. */
  const studyDesigns = acc[FHIR_FIELD_KEY.STUDY_DESIGNS];

  if (resource) {
    /* Grab the category array. */
    const categories = resource.category;

    if (categories) {
      /* Accumulate any codes belonging to study design. */
      return categories.reduce((acc, category) => {
        const { coding } = category || {};
        const codes = getDesignCodes(coding, systemType);

        return acc.concat(codes);
      }, studyDesigns);
    }
  }

  return studyDesigns;
}

/**
 *
 * @param resource
 * @param acc
 */
function rollUpSubjectsTotal(resource, acc) {
  /* Define the extension type of interest. */
  const extensionType = "ResearchStudy-Content";
  const extensionTypeCount = "ResearchStudy-Content-NumSubjects";

  /* Grab any accumulated subjects totals. */
  const subjectsTotal = acc[FHIR_FIELD_KEY.SUBJECTS_TOTAL];

  if (resource) {
    /* Find the resource extensions for the study content; the url ends with ~ResearchStudy-Content. */
    const studyContent = findExtensionType(resource, extensionType);

    if (studyContent) {
      const { extension } = studyContent;

      if (extension) {
        return extension.reduce((acc, node) => {
          const { url, valueCount } = node || {},
            { value } = valueCount || {};

          if (isExtensionType(url, extensionTypeCount) && value) {
            acc += value;
          }

          return acc;
        }, subjectsTotal);
      }
    }
  }

  return subjectsTotal;
}

module.exports.getFHIRStudy = getFHIRStudy;
