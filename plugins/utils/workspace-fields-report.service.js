/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for reading AnVIL workspaces JSON file and generating csv report.
 */

// Core dependencies
const fs = require("fs");
const path = require("path");

// Template variables
const workspacesFileName = "prod-workspaces-sb-all.json";
const allowListWorkspaceFields = [
  "library:dataUseRestriction",
  "library:diseaseOntologyLabel",
  "library:datatype"
];

const generateWorkspaceFieldsReportCSV = async function generateWorkspaceFieldsReportCSV() {
  /* Only run plugin if the workspace JSON file exists. */
  if (fs.existsSync(path.resolve(__dirname, workspacesFileName))) {
    console.log("Generating workspace fields report.");

    /* Grab the json file. */
    const workspacesJSON = require(path.resolve(__dirname, workspacesFileName));

    /* Generate the report headings. */
    const reportHeadings = allowListWorkspaceFields.reduce((acc, fieldName) => {
      return `${acc}, ${fieldName}`;
    }, "Workspace Name");

    /* Filter for anvil workspaces only, and generate fields (of interest) for each workspace as a string. */
    /* Concatenate each workspace with "\n" to format each workspace as it's own row in the CSV report. */
    const fieldsByWorkspace = workspacesJSON
      .map(ws => ws.workspace)
      .filter(workspace => workspace.namespace.startsWith("anvil"))
      .reduce((acc, workspace) => {
        const { attributes, name } = workspace || {};
        const workspaceString = `${name}${buildWorkspaceFieldsString(
          attributes
        )}`;

        return acc.concat("\n", workspaceString);
      }, reportHeadings);

    fs.writeFileSync("static/workspace-fields-report.csv", fieldsByWorkspace);
  } else {
  /* Return - file doesn't exist and plugin will not proceed. */
    console.log(
      "Generation of workspace fields report unable to run: workspaces JSON file not found."
    );
  }
};

/**
 * Returns a concatenated string for each field of interest, recording whether the field key exists for the workspace,
 * and if so, whether the corresponding field value is valid i.e. not "NA".
 * Fields of interest are defined by the template variable allowListWorkspaceFields.
 *
 * @param attributes
 * @returns {*}
 */
function buildWorkspaceFieldsString(attributes) {
  return allowListWorkspaceFields.reduce((acc, field) => {
    const attributeValue = attributes[field];
    let fieldResponse = "VALUE";

    if (attributeValue === undefined) {
      fieldResponse = "NOKEY";
    }

    if (attributeValue === "NA") {
      fieldResponse = "NA";
    }

    return acc.concat(", ", fieldResponse);
  }, "");
}

module.exports.generateWorkspaceFieldsReportCSV = generateWorkspaceFieldsReportCSV;
