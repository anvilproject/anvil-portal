import { SiteConfig } from "../../common/entities";
import { makeConfig } from "../dev/config";

const EXPLORER_URL = "https://explore.anvilproject.org";
const PORTAL_URL = "https://anvilproject.org";

const config: SiteConfig = {
  ...makeConfig(EXPLORER_URL, PORTAL_URL),
  analytics: {
    gtmAuth: "IgbX8s-NCGg81Z0eWB6KAQ", // GTM environment-specific
    gtmId: "GTM-KMGCR8F",
    gtmPreview: "env-1",
  },
};

if (config.layout.header.announcements) {
  config.layout.header.announcements = undefined;
}

export default config;
