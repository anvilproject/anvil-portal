import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import devConfig from "../dev/config";

const config: SiteConfig = {
  ...devConfig,
  analytics: {
    gtmAuth: "IgbX8s-NCGg81Z0eWB6KAQ", // GTM environment-specific
    gtmId: "GTM-KMGCR8F",
    gtmPreview: "env-1",
  },
};

export default config;
