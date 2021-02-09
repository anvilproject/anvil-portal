/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Utility class for DOM-related functionality. 
 */

/**
 * Returns true if the specified HTML element is an anchor.
 *
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export function isAnchor(element) {

    return !!element && element.tagName === "A";
}

/**
 * Returns true if the href attribute links to an external site.
 *
 * @param {string} url
 * @returns {boolean}
 */
export function isHrefExternal(url) {

    const regex = /^https?:\/\/(?!anvilproject\.org)./i;
    return regex.test(url);
}

/**
 * Returns true if the protocol of the href attribute is mailto.
 *
 * @param {string} url
 * @returns {boolean}
 */
export function isMailTo(url) {

    const regex = /^mailto:/i;
    return regex.test(url);
}
