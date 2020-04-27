/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service handling environment-related functionality.
 */

// App dependencies
const GATSBY_ENV = process.env.GATSBY_ENV;

/**
 * Returns true if the current environment is production.
 */
export function isProd() {

    return true;
    //return GATSBY_ENV === "PROD";
}
