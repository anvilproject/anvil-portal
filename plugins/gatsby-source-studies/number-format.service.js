/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Utility class for formatting number values. 
 */

/**
 * Formats file size to TB, formatted to two decimal places.
 *
 * @param size
 * @returns {string}
 */
const formatSizeToTB = function formatSizeToTB(size) {

    return (size / 1E12).toFixed(2);
};

module.exports.formatSizeToTB = formatSizeToTB;
