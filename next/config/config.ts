import { setConfig } from "@clevercanary/data-explorer-ui/lib/config/config";
import anvilPortalDev from "../site-config/anvil-portal/dev/config";
import anvilPortalProd from "../site-config/anvil-portal/prod/config";
import { SiteConfig } from "../site-config/common/entities";

const CONFIGS: { [k: string]: SiteConfig } = {
  "anvil-portal-dev": anvilPortalDev,
  "anvil-portal-prod": anvilPortalProd,
};

let appConfig: SiteConfig | null = null;

export const config = (): SiteConfig => {
  if (appConfig) {
    return appConfig;
  }

  const config = process.env.NEXT_PUBLIC_SITE_CONFIG;

  if (!config) {
    console.error(`Config not found. config: ${config}`);
  }

  appConfig = CONFIGS[config as string];

  if (!appConfig) {
    console.error(`No app config was found for the config: ${config}`);
  } else {
    console.log(`Using app config ${config}`);
  }

  setConfig(appConfig); // Sets app config.
  return appConfig;
};
