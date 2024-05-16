import { ELEMENT_ALIGNMENT } from "@databiosphere/findable-ui/lib/common/entities";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import * as C from "../../../components/index";
import { SiteConfig } from "../../common/entities";
import { socialMedia } from "./socialMedia";

const APP_TITLE = "AnVIL Portal";
const EXPLORER_URL = "https://explore.anvilproject.dev.clevercanary.com";
const PORTAL_URL = "https://anvilproject.dev.clevercanary.com";
const SLOGAN = "NHGRI Analysis Visualization and Informatics Lab-space";

export function makeConfig(browserUrl: string, portalUrl: string): SiteConfig {
  return {
    analytics: {
      gtmAuth: "dn4W-jqWUyNBj6ON0Ic_wA", // GTM environment-specific
      gtmId: "GTM-KMGCR8F",
      gtmPreview: "env-65",
    },
    appTitle: APP_TITLE,
    browserURL: browserUrl,
    dataSource: {
      url: "",
    },
    entities: [],
    explorerTitle: null,
    layout: {
      footer: {
        Branding: C.ANVILBranding({ portalURL: undefined }),
        navLinks: [
          {
            label: "Help",
            url: `${portalUrl}/help`,
          },
          {
            label: "Privacy",
            url: `${portalUrl}/privacy`,
          },
        ],
        socials: socialMedia.socials,
      },
      header: {
        Logo: C.Logo({
          alt: APP_TITLE,
          height: 40,
          link: portalUrl,
          src: "/consortia/logos/logoAnvil.png",
        }),
        authenticationEnabled: false,
        navAlignment: ELEMENT_ALIGNMENT.CENTER,
        navLinks: [
          {
            label: "Overview",
            url: `${portalUrl}/overview`,
          },
          {
            label: "Learn",
            url: `${portalUrl}/learn`,
          },
          {
            label: "Datasets",
            menuItems: [
              {
                description:
                  "An open-access view of studies, workspaces, and consortia.",
                label: "Catalog",
                url: `${portalUrl}/data`,
              },
              {
                description:
                  "Build, download, and export cross-study cohorts of open and managed access data.",
                label: C.LabelIconMenuItem({
                  iconFontSize: "small",
                  label: "Explorer",
                }),
                target: ANCHOR_TARGET.BLANK,
                url: `${browserUrl}/datasets`,
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
            url: `${portalUrl}/news`,
          },
          {
            label: "Events",
            url: `${portalUrl}/events`,
          },
          {
            label: "More",
            menuItems: [
              {
                label: "Team",
                url: `${portalUrl}/team`,
              },
              {
                label: "FAQ",
                url: `${portalUrl}/faq`,
              },
              {
                label: "Help",
                url: `${portalUrl}/help`,
              },
            ],
            url: "",
          },
        ],
        searchEnabled: true,
        searchURL: `${portalUrl}/search`,
        slogan: SLOGAN,
        socialMedia: socialMedia,
      },
    },
    portalURL: portalUrl,
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
}

const config: SiteConfig = makeConfig(EXPLORER_URL, PORTAL_URL);

export default config;
