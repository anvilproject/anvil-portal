import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import * as C from "../../../components";
import { SiteConfig } from "../../common/entities";
import devConfig, { PORTAL_URL } from "../dev/config";

const EXPLORER_URL = "https://prod.anvil.gi.ucsc.edu";

const config: SiteConfig = {
  ...devConfig,
  analytics: {
    gtmAuth: "IgbX8s-NCGg81Z0eWB6KAQ", // GTM environment-specific
    gtmId: "GTM-KMGCR8F",
    gtmPreview: "env-1",
  },
  layout: {
    ...devConfig.layout,
    header: {
      ...devConfig.layout.header,
      navLinks: [
        {
          label: "Overview",
          url: `${PORTAL_URL}/overview`,
        },
        {
          label: "Learn",
          url: `${PORTAL_URL}/learn`,
        },
        {
          featureFlag: false,
          label: "Datasets",
          url: `${PORTAL_URL}/data`,
        },
        {
          featureFlag: true,
          label: "Datasets",
          menuItems: [
            {
              description:
                "An open-access view of studies, workspaces, and consortia.",
              label: "Catalog",
              url: `${PORTAL_URL}/data`,
            },
            {
              description:
                "Build, download, and export cross-study cohorts of open and managed access data.",
              label: C.LabelIconMenuItem({
                iconFontSize: "small",
                label: "Explorer",
              }),
              target: ANCHOR_TARGET.BLANK,
              url: `${EXPLORER_URL}/datasets`,
            },
          ],
          url: "",
        },
        {
          label: "Consortia",
          url: "/consortia",
        },
        {
          label: "News",
          url: `${PORTAL_URL}/news`,
        },
        {
          label: "Events",
          url: `${PORTAL_URL}/events`,
        },
        {
          label: "More",
          menuItems: [
            {
              label: "Team",
              url: `${PORTAL_URL}/team`,
            },
            {
              label: "FAQ",
              url: `${PORTAL_URL}/faq`,
            },
            {
              label: "Help",
              url: `${PORTAL_URL}/help`,
            },
          ],
          url: "",
        },
      ],
    },
  },
};

export default config;
