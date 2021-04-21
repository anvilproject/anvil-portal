/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for AnVIL dashboard file system methods.
 */

// Core dependencies
const fs = require("fs");
const path = require("path");

/**
 * Caches the specified content to the specified file.
 *
 * @param file
 * @param content
 * @param options
 * @returns {Promise.<void>}
 */
const cacheFile = async function cacheFile(file, content, options = null) {

    if ( file && content ) {

        const absPath = path.resolve(__dirname, file);

        fs.writeFileSync(absPath, content, options);
    }
};

/**
 * Returns the file contents parsed into a model shaped by FIELD.
 *
 * @param contentRows
 * @param delimiter
 * @param FIELD
 * @param FIELD_TYPE
 * @returns {Array}
 */
const parseRows = function parseRows(contentRows, delimiter = ",", FIELD, FIELD_TYPE) {

    if ( contentRows && Array.isArray(contentRows) ) {

        /* Build the header row. */
        const headers = buildFileHeaders(contentRows, delimiter);

        /* Parse each content row. */
        return contentRows
            .slice(1)
            .map(contentRow => parseRow(contentRow, delimiter, headers, FIELD, FIELD_TYPE));
    }

    return [];
};

/**
 * Returns the file content for the specified file.
 *
 * @param file
 * @param options
 */
const readFile = async function readFile(file, options = null) {

    /* Grab the file contents. */
    if ( fs.existsSync(path.resolve(__dirname, file)) ) {

        const filePath = path.resolve(__dirname, file);

        return await fs.readFileSync(filePath, options);
    }
    else {

        /* File does not exist. */
        console.log(`File does not exist ${file}`);
    }
};

/**
 * Returns file content rows; where each row of a file is represented by a string element of an array.
 *
 * @param content
 * @returns {Array}
 */
const splitContentToContentRows = function splitContentToContentRows(content) {

    if ( content ) {

        /* Split the file content into rows. */
        /* Each element of the array represents a row (as a string value) from the file. */
        /* e.g. [first_line, second_line, third_line, and so on...]. */
        return content
            .toString()
            .trim()
            .split(/\r?\n/);
    }

    return [];
};

/**
 * Returns the file headers.
 *
 * @param contentRows
 * @param delimiter
 * @returns {Array}
 */
function buildFileHeaders(contentRows, delimiter) {

    return contentRows
        .slice(0, 1)
        .toString()
        .toLowerCase()
        .split(delimiter);
}

/**
 * Returns the datum formatted as a string array.
 *
 * @param datum
 * @returns {*}
 */
function formatDatumAsArray(datum) {

    if ( datum ) {

        return datum
            .split(",")
            .reduce((acc, val) => {

                const str = val.trim();

                if ( str ) {

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

    if ( !datum ) {

        return 0;
    }

    const value = datum.replace(/,/g, "");

    if ( isNaN(value) ) {

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

    if ( datum ) {

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
    if ( fieldType === "number" ) {

        return formatDatumAsNumber(datum);
    }

    /* Format datum as array. */
    if ( fieldType === "array" ) {

        return formatDatumAsArray(datum);
    }

    if ( fieldType === "string" ) {

        return formatDatumAsString(datum);
    }

    return datum;
}

/**
 * Returns the row data, parsed into a model as specified by the FIELD list.
 *
 * @param contentRow
 * @param delimiter
 * @param headers
 * @param FIELD
 * @param FIELD_TYPE
 * @returns {*}
 */
function parseRow(contentRow, delimiter, headers, FIELD, FIELD_TYPE) {

    /* Parse the row data. */
    return contentRow
        .split(delimiter)
        .reduce((acc, datum, i) => {

            const header = headers[i];
            const key = FIELD[header];
            const fieldType = FIELD_TYPE[header];

            /* Only include data we are interested in. */
            if ( key ) {

                const value = parseDatumValue(datum, fieldType);
                acc = Object.assign(acc, {[key]: value});
            }

            return acc;
        }, {});
}

module.exports.cacheFile = cacheFile;
module.exports.parseRows = parseRows;
module.exports.readFile = readFile;
module.exports.splitContentToContentRows = splitContentToContentRows;
