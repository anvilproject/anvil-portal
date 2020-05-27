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
 * Returns true if the href attribute of the specified HTML element links to an external site.
 *
 * @param {string} url
 * @returns {boolean}
 */
export function isHrefExternal(url) {

    var regex = /^https?:\/\//i;
    return regex.test(url);
}

/**
 * Returns true if the protocol of the specified HTML element is mailto.
 *
 * @param {string} url
 * @returns {boolean}
 */
export function isMailTo(url) {

    var regex = /^mailto:/i;
    return regex.test(url);
}
