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

    if ( !isTrackingEnabled() ) {
        return;
    }

    const eventConfig = Object.assign({
        event: category,
        eventAction: action,
        eventLabel: label
    }, dimensions);

    getDataLayer().push(eventConfig);
}

/**
 * Returns the GTM data layer, if enabled, enabled for this environment.
 *
 * @returns {{}}
 */
function getDataLayer() {

    return window.dataLayer;
}

/**
 * Returns true if tracking is enabled.
 *
 * @returns {boolean}
 */
function isTrackingEnabled() {

    return !!getDataLayer();
}