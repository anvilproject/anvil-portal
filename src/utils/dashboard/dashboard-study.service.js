/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for dashboard study.
 */

/**
 * Returns the number of consents.
 *
 * @param consents
 * @returns {number}
 */
export function getConsentsCount(consents) {

    if ( !consents ) {

        return 0;
    }

    return consents.length - 1;
}

/**
 * Returns the number of diseases.
 *
 * @param diseases
 * @returns {number}
 */
export function getDiseasesCount(diseases) {

    if ( !diseases ) {

        return 0;
    }

    const diseasesList = diseases.split(",");

    return diseasesList.length - 1;
}

/**
 * Returns the first consent (short name).
 *
 * @param consents
 * @returns {*}
 */
export function getFirstConsent(consents) {

    if ( !consents ) {

        return "";
    }

    return consents[0].consentShortName;
}

/**
 * Returns the first disease.
 *
 * @param diseases
 * @returns {*}
 */
export function getFirstDisease(diseases) {

    if ( !diseases ) {

        return "";
    }

    const diseasesList = diseases.split(",");

    return diseasesList[0];
}
