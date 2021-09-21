/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service handling environment-related functionality.
 */

// Template variables
const GATSBY_ENV = process.env.GATSBY_ENV;

/**
 * Returns the name of the current environment.
 */
export function getCurrentEnvironment() {
  return GATSBY_ENV.toUpperCase();
}

/**
 * Returns true if the current environment is production.
 */
export function isProd() {
  return getCurrentEnvironment() === "PROD";
}

/**
 * Returns true if the current environment is staging.
 */
export function isStaging() {
  return getCurrentEnvironment() === "STAGING";
}
