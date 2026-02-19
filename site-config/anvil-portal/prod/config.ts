import { SiteConfig } from "../../common/entities";
import { GIT_HUB_REPO_URL, makeConfig } from "../dev/config";
import {
  RAS_BANNER,
  REPOSITORY_REVIEW_BANNER,
} from "../dev/announcements/announcements";

const EXPLORER_URL = "https://explore.anvilproject.org";
const PORTAL_URL = "https://anvilproject.org";

const config: SiteConfig = {
  ...makeConfig(EXPLORER_URL, PORTAL_URL, GIT_HUB_REPO_URL),
  analytics: {
    gtmAuth: "IgbX8s-NCGg81Z0eWB6KAQ", // GTM environment-specific
    gtmId: "GTM-KMGCR8F",
    gtmPreview: "env-1",
  },
};

config.layout.header.announcements = [RAS_BANNER, REPOSITORY_REVIEW_BANNER];

export default config;
