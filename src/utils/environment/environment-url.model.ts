/**
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Set of urls for the "current" environment.
 */

const EnvironmentUrls = new Map<string, string>([
  ["LOCAL", "http://localhost:8000/"],
  ["MASTER", "https://anvilproject.org/"],
  ["STAGING", "https://staging.anvilproject.org/"],
  ["UX-DEV", "https://staging.anvilproject.org/"],
]);

export default EnvironmentUrls;
