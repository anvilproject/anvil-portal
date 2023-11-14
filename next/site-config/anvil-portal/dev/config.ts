import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import * as C from "../../../components/index";
import { SiteConfig } from "../../common/entities";
import { socials } from "./constants";

const APP_TITLE = "AnVIL Portal";
const EXPLORER_URL = "https://explore.anvilproject.dev.clevercanary.com";
export const PORTAL_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";
const SLOGAN = "NHGRI Analysis Visualization and Informatics Lab-space";

const config: SiteConfig = {
  analytics: {
    gtmAuth: "dn4W-jqWUyNBj6ON0Ic_wA", // GTM environment-specific
    gtmId: "GTM-KMGCR8F",
    gtmPreview: "env-65",
  },
  appTitle: APP_TITLE,
  browserURL: "",
  dataSource: {
    url: "",
  },
  entities: [],
  explorerTitle: "",
  layout: {
    footer: {
      Branding: C.ANVILBranding({ portalURL: undefined }),
      navLinks: [
        {
          label: "Help",
          url: `${PORTAL_URL}/help`,
        },
        {
          label: "Privacy",
          url: `${PORTAL_URL}/privacy`,
        },
      ],
      socials,
    },
    header: {
      Logo: C.Logo({
        alt: APP_TITLE,
        height: 40,
        link: PORTAL_URL,
        src: "/consortia/logos/logoAnvil.png",
      }),
      authenticationEnabled: false,
      navAlignment: ELEMENT_ALIGNMENT.CENTER,
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
      searchEnabled: true,
      searchURL: `${PORTAL_URL}/search`,
      slogan: SLOGAN,
      socials,
    },
  },
  redirectRootToPath: "/",
  themeOptions: {
    palette: {
      primary: {
        dark: "#003E76",
        main: "#035C94",
      },
    },
  },
};

export default config;
