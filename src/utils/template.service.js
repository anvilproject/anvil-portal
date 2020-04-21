/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic content template service.
 */

/**
 * Returns the h1 value for the page.
 *
 * @param headings
 * @returns {string}
 */
export function getPageH1(headings) {

    if ( headings ) {

        const pageHeading = headings.find(heading => heading.depth === 1);

        if ( pageHeading ) {

            return pageHeading.value;
        }
    }
}
