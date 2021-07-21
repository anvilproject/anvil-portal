/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service handling environment-related functionality.
 */

// App dependencies
import { EnvironmentUrls } from "./environment-url.model";


// Template variables
const GATSBY_ENV = process.env.GATSBY_ENV;

/**
 * Returns the name of the current environment.
 */
export function getCurrentEnvironment(): string {
  return GATSBY_ENV as string; //TODO revisit process.env typing
}

/**
 * Returns the current environment's url.
 */
export function getCurrentEnvironmentURL() {
  const currentEnvironment : string = getCurrentEnvironment().toUpperCase();

  return EnvironmentUrls.get(currentEnvironment);
}

/**
 * Returns true if the current environment is production.
 */
export function isProd() {
  return GATSBY_ENV === "master";
}

/**
 * Returns true if the current environment is staging.
 */
export function isStaging() {
  return GATSBY_ENV === "staging";
}
