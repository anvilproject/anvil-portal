/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic service supporting page styles.
 */

// Template variables
const ALIGNMENT = {
  LEFT: "left"
};

/**
 * Returns true if the page is left aligned.
 *
 * @param alignment
 * @returns {boolean}
 */
export function isPageAlignmentLeft(alignment) {
  return alignment === ALIGNMENT.LEFT;
}
