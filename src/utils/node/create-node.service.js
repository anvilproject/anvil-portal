/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic service supporting gatsby-node createNode API.
 */

/**
 * Builds the post file path into a slug.
 *
 * @param filePath
 * @returns {*}
 */
const buildPostSlug = function buildPostSlug(filePath) {
  if (filePath) {
    /* Strip the file path's tailing "/". */
    return filePath.replace(/\/$/, "");
  }

  return filePath;
};

module.exports.buildPostSlug = buildPostSlug;
