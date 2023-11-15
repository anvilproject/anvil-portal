import { EnvironmentUrl } from "./environment/environment-url.model";
import { getCurrentEnvironment } from "./environment/environment.service";

const PROD_ENV = ["ANVIL-PROD", "MASTER", "PROD"];

/**
 * Returns the explore URL for the given environment.
 * @returns explore URL.
 */
export function getExploreURL() {
  const currentEnvironment = getCurrentEnvironment();
  if (PROD_ENV.includes(currentEnvironment)) {
    return `${EnvironmentUrl["EXPLORE-PROD"]}explore/datasets`;
  }
  return `${EnvironmentUrl["EXPLORE-DEV"]}datasets`;
}
