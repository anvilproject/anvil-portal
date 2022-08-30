import anvilConfig from "../config/anvil/config";
import { SiteConfig } from "../config/entities";
import ncpiConfig from "../config/ncpi/config";

export enum SITE {
  ANVIL = "ANVIL",
  NCPI = "NCPI",
}

const CONFIGS = {
  ANVIL: anvilConfig,
  NCPI: ncpiConfig,
};

export const useConfig = (site: SITE): SiteConfig => {
  return CONFIGS[site];
};
