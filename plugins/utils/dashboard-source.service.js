/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service supporting access with dashboard csv or tsv files.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {
  parseContentRows,
  readFile,
  writeFile,
} = require(path.resolve(__dirname, "./dashboard-file-system.service.js"));

// Template variables
const ncpiFileSource = "dashboard-source-ncpi.csv";

/**
 * Reads the ncpi source and returns the data as an array.
 *
 * @returns {Promise<*>}
 */
const readNCPISource = async function readNCPISource(FIELD_KEY, FIELD_TYPE) {
  return await parseSource(ncpiFileSource, FIELD_KEY, FIELD_TYPE);
};

/**
 * Writes to the ncpi source.
 * New content is platform and study id.
 *
 * @param platform
 * @param studyId
 * @returns {Promise<void>}
 */
const writeNCPISource = async function writeNCPISource(platform, studyId) {
  const content = `${platform},${studyId}\n`;
  console.log(`Saving NCPI study for ${platform}: ${studyId}`);

  /* If the file does not exist, it will be created. */
  /* See https://nodejs.org/api/fs.html#fs_file_system_flags {"flag": "as+"}. */
  await writeFile(ncpiFileSource, content, { flag: "as+" });
};

/**
 * Returns the source into an array, shaped by the specified FIELD_KEY.
 *
 * @param fileSource
 * @param FIELD_KEY
 * @param FIELD_TYPE
 * @returns {Promise<*>}
 */
async function parseSource(fileSource, FIELD_KEY, FIELD_TYPE) {
  /* Read dashboard source file. */
  const content = await readFile(fileSource, "utf8");

  /* Parse and return the ingested data. */
  return parseContentRows(content, ",", FIELD_KEY, FIELD_TYPE);
}

module.exports.readNCPISource = readNCPISource;
module.exports.writeNCPISource = writeNCPISource;
