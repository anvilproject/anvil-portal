/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for AnVIL dashboard file system methods.
 */

// Core dependencies
const fs = require("fs");
const path = require("path");

const parseCsv = promisify(require("csv-parse").parse);

/**
 * Returns the file contents parsed into a model shaped by FIELD, or as row arrays if FIELD is omitted.
 *
 * @param content
 * @param delimiter
 * @param FIELD
 * @param FIELD_TYPE
 * @returns {Promise<Array>}
 */
const parseContentRows = async function parseContentRows(
  content,
  delimiter = ",",
  FIELD,
  FIELD_TYPE
) {
  if (!FIELD) return await parseCsv(content, { delimiter })
  const keyTypes = Object.fromEntries(Object.entries(FIELD_TYPE).map(([header, type]) => [FIELD[header], type]));
  return await parseCsv(content, {
    delimiter,
    columns: row => row.map(header => FIELD[header]),
    cast: (datum, info) => info.header ? datum : parseDatumValue(datum, keyTypes[info.column])
  })
};

/**
 * Returns the file content for the specified file.
 *
 * @param file
 * @param options
 */
const readFile = async function readFile(file, options = null) {
  try {
    const filePath = path.resolve(__dirname, file);
    return fs.readFileSync(filePath, options);
  } catch (err) {}
};

/**
 * Writes the specified content to the specified file.
 *
 * @param file
 * @param content
 * @param options
 * @returns {Promise.<void>}
 */
const writeFile = async function writeFile(file, content, options = null) {
  if (!file || !content) {
    throw `Error writeFile file or content is null or empty; ${file}, ${content}`;
  }

  const absPath = path.resolve(__dirname, file);

  fs.writeFileSync(absPath, content, options);
  console.log(`Writing to file ${file}`);
};

/**
 * Returns the datum formatted as a string array.
 *
 * @param datum
 * @returns {*}
 */
function formatDatumAsArray(datum) {
  if (datum) {
    return datum.split(",").reduce((acc, val) => {
      const str = val.trim();

      if (str) {
        acc.push(str);
      }

      return acc;
    }, []);
  }

  return [];
}

/**
 * Returns the datum formatted as a number.
 *
 * @param datum
 * @returns {number}
 */
function formatDatumAsNumber(datum) {
  if (!datum) {
    return 0;
  }

  const value = datum.replace(/,/g, "");

  if (isNaN(value)) {
    return 0;
  }

  return Number(value);
}

/**
 * Returns the datum formatted as a string.
 *
 * @param datum
 * @returns {string}
 */
function formatDatumAsString(datum) {
  if (datum) {
    return datum.trim();
  }

  return "";
}

/**
 * Returns the datum, corrected for type.
 * i.e. will return a number as Number, instead of a string.
 *
 * @param datum
 * @param fieldType
 */
function parseDatumValue(datum, fieldType) {
  /* Format datum as number. */
  if (fieldType === "number") {
    return formatDatumAsNumber(datum);
  }

  /* Format datum as array. */
  if (fieldType === "array") {
    return formatDatumAsArray(datum);
  }

  if (fieldType === "string") {
    return formatDatumAsString(datum);
  }

  return datum;
}

module.exports.parseContentRows = parseContentRows;
module.exports.readFile = readFile;
module.exports.writeFile = writeFile;
