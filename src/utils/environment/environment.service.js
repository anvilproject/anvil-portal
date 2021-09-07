/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service handling environment-related functionality.
 */

// App dependencies
import { EnvironmentUrl } from "./environment-url.model";

// Template variables
const GATSBY_ENV = process.env.GATSBY_ENV;

/**
 * Returns the name of the current environment.
 */
export function getCurrentEnvironment() {
  return GATSBY_ENV.toUpperCase();
}

/**
 * Returns the current environment's url.
 */
export function getCurrentEnvironmentURL() {
  const currentEnvironment = getCurrentEnvironment();

  return EnvironmentUrl[currentEnvironment];
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
