import { SELECTED_MATCH } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import * as C from "../../../components/index";
import { ROUTES } from "../../../routes/constants";
import { SiteConfig } from "../../common/entities";
import { buildMenuItems } from "./common/utils";
import { CONSORTIA } from "./navigation/consortia";
import { FAQ } from "./navigation/faq";
import { LEARN } from "./navigation/learn";
import { OVERVIEW } from "./navigation/overview";
import { TEAM } from "./navigation/team";
import { socialMedia, SOCIALS } from "./socialMedia";

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
        Branding: C.ANVILBranding(),
        navLinks: [
          {
            label: "Help",
            url: ROUTES.HELP,
          },
          {
            label: "Privacy",
            url: ROUTES.PRIVACY,
          },
        ],
        socials: socialMedia.socials,
      },
      header: {
        authenticationEnabled: false,
        logo: C.Logo({
          alt: APP_TITLE,
          height: 40,
          link: "/",
          src: "/consortia/logos/logoAnvil.png",
        }),
        navigation: [
          undefined,
          [
            {
              label: "Overview",
              menuItems: buildMenuItems(OVERVIEW),
              url: ROUTES.OVERVIEW,
            },
            {
              label: "Learn",
              menuItems: buildMenuItems(LEARN),
              selectedMatch: SELECTED_MATCH.EQUALS,
              url: "",
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
              label: "News",
              url: ROUTES.NEWS,
            },
            {
              label: "Events",
              url: ROUTES.EVENTS,
            },
            {
              flatten: { xs: true },
              label: "More",
              menuItems: [
                {
                  label: "Consortia",
                  menuItems: [
                    {
                      label: "Overview",
                      selectedMatch: SELECTED_MATCH.EQUALS,
                      url: ROUTES.CONSORTIA,
                      visible: { lg: false, md: false },
                    },
                    {
                      label: "CSER",
                      menuItems: buildMenuItems(CONSORTIA),
                      selectedMatch: SELECTED_MATCH.EQUALS,
                      url: `${ROUTES.CONSORTIA}/cser`,
                      visible: { lg: false, md: false },
                    },
                  ],
                  url: ROUTES.CONSORTIA,
                },
                {
                  label: "Team",
                  menuItems: buildMenuItems(TEAM),
                  url: ROUTES.TEAM,
                },
                {
                  label: "FAQ",
                  menuItems: buildMenuItems(FAQ),
                  url: ROUTES.FAQ,
                },
                {
                  label: "Help",
                  url: ROUTES.HELP,
                },
                {
                  label: "Follow Us",
                  menuItems: [
                    {
                      ...SOCIALS.DISCOURSE,
                      icon: C.DiscourseIcon({}),
                      target: ANCHOR_TARGET.BLANK,
                    },
                    {
                      ...SOCIALS.X,
                      icon: C.XIcon({}),
                      target: ANCHOR_TARGET.BLANK,
                    },
                    {
                      ...SOCIALS.YOUTUBE,
                      icon: C.YouTubeIcon({}),
                      target: ANCHOR_TARGET.BLANK,
                    },
                    {
                      ...SOCIALS.GITHUB,
                      icon: C.GitHubIcon({}),
                      target: ANCHOR_TARGET.BLANK,
                    },
                    {
                      ...SOCIALS.SLACK,
                      icon: C.SlackIcon({}),
                      target: ANCHOR_TARGET.BLANK,
                    },
                  ],
                  url: "",
                  visible: { lg: false, sm: false, xs: false },
                },
              ],
              url: "",
            },
          ],
          undefined,
        ],
        searchEnabled: true,
        searchURL: ROUTES.SEARCH,
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
