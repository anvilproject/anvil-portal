/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Utility class for AnVIL-specific Google Tag Manager functionality. 
 */

// App dependencies
import { GAAction } from "./ga-action.model";
import { GACategory } from "./ga-category.model";
import { GAEntityName } from "./ga-entity-name.model";
import { GAEntityType } from "./ga-entity-type.model";
import * as GTMService from "../gtm/gtm.service";
import { GADimensionsByHref } from "./ga-dimensions-by-href.model";

/**
 * Create and send a GA tracking event generated from the specified external link and label. Dimensions are calculated
 * from the specified URL.
 * 
 * @param {string} url
 * @param {string} linkText
 */
export function trackExternalLinkClicked(url, linkText) {

    const dimensions = createExternalLinkDimensions(url);
    GTMService.trackEvent(GACategory.EXTERNAL_LINK, GAAction.CLICK, linkText, dimensions);
}

/**
 * If there is an entity name configured for the specified URL, return it as is. If not and the URL links to a Terra
 * workspace, generate the entity name from the workspace name in the URL. If the URL links to dbGaP, generate the
 * entity name from the dbGaP ID. Otherwise, return unspecified.
 *
 * @param {string} url
 * @returns {string}
 */
function calculateEntityName(url) {

    const {entityName} = GADimensionsByHref[url] || {};
    if ( entityName ) {
        return entityName;
    }

    if ( isURLTerraWorkspace(url) ) {

        // Return the workspace name, which is specified after the last / in the URL
        return /[^/]*$/.exec(url)[0];
    }

    if ( isDbGaP(url) ) {

        // Return the dbGap ID which is specified after the = in the URL
        return /[^=]*$/.exec(url)[0];
    }

    return GAEntityName.UNSPECIFIED;
}

/**
 * If there is an entity type configured for the specified URL, return it as is. If not and the URL links to a Terra
 * workspace, return the workspace entity type. If the URL links to dbGaP, return the study entity type. Otherwise
 * return unspecified.
 *
 * @param {string} url
 * @returns {string}
 */
function calculateEntityType(url) {

    const {entityType} = GADimensionsByHref[url] || {};
    if ( entityType ) {
        return entityType;
    }

    if ( isURLTerraWorkspace(url) ) {

        return GAEntityType.WORKSPACE;
    }

    if ( isDbGaP(url) ) {

        return GAEntityType.STUDY;
    }

    return GAEntityType.UNSPECIFIED;
}

/**
 * Returns dimension values that are required when tracking click event: entity name, entity type, entity URL and 
 * source URL.
 *
 * @param {string} url
 * @returns {any}
 */
function createExternalLinkDimensions(url) {

    return {
        entityName: calculateEntityName(url),
        entityType: calculateEntityType(url),
        entityUrl: url,
        sourceUrl: window.location.pathname
    };
}

/**
 * Returns true if the specified URL is a link to dbGap.
 *
 * @param {string} url
 * @returns {boolean}
 */
function isDbGaP(url) {

    return url.match(/^https:\/\/www\.ncbi\.nlm\.nih\.gov\/projects\/gap\/cgi-bin\/study\.cgi\?study_id=/);
}

/**
 * Returns true if the specified URL is a link to a Terra workspace.
 * 
 * @param {string} url
 * @returns {boolean}
 */
function isURLTerraWorkspace(url) {

    return url.match(/^https:\/\/anvil\.terra\.bio\/#workspaces\//);
}
