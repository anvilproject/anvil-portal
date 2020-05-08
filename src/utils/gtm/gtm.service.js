/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Utility class for Google Tag Manager-related functionality. 
 */

/**
 * Send custom event to GTM/GA.
 * 
 * @param {string} category
 * @param {string} action
 * @param {string} label
 * @param {any} dimensions
 */
export function trackEvent(category, action, label, dimensions) {

    const eventConfig = Object.assign({
        event: category,
        eventAction: action,
        eventLabel: label
    }, dimensions);

    window.dataLayer.push(eventConfig);
}
