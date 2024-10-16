import { config } from "../../config/config";
import { SiteConfig } from "../../site-config/common/entities";

interface ContentScope {
  portalURL: string;
}

/**
 * Returns the content scope.
 * @returns content scope.
 */
export function getContentScope(): ContentScope {
  const siteConfig = config() as SiteConfig;
  const portalURL = siteConfig.portalURL;
  return { portalURL };
}
