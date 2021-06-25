/**
 * The AnVIL
 * https://www.anvilproject.org
 * Custom plugin generating a csv file reporting on the state of AnVIL workspace fields.
 */

// Core dependencies
const path = require("path");

// App dependencies
const { generateWorkspaceFieldsReportCSV } = require(path.resolve(
  __dirname,
  "../utils/workspace-fields-report.service.js"
));

exports.onPostBootstrap = ({}) => {
  /* Read workspaces JSON file and generate csv report. */
  generateWorkspaceFieldsReportCSV();
};
