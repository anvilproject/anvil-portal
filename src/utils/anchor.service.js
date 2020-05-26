/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic anchor service.
 */

/**
 * Builds identifier specified by title.
 *
 * @param title
 * @returns {string}
 */
export function buildAnchorIdentifier(title) {

    let specialCharacters = /[:?.,()/]/g,
        whiteSpace = /\s/g;

    return title.replace(whiteSpace, '-').replace(specialCharacters, '').toLowerCase();
}
