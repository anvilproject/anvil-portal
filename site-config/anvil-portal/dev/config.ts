import { SELECTED_MATCH } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import * as C from "../../../components";
import { ROUTES } from "../../../routes/constants";
import { FLATTEN, VISIBLE } from "../../common/constants";
import { SiteConfig } from "../../common/entities";
import { announcements } from "./announcements/announcements";
import { buildMenuItems } from "./common/utils";
import { CONSORTIA } from "./navigation/consortia";
import { FAQ } from "./navigation/faq";
import { OVERVIEW } from "./navigation/overview";
import { TEAM } from "./navigation/team";
import { socialMedia, SOCIALS } from "./socialMedia";

const APP_TITLE = "AnVIL Portal";
const EXPLORER_URL = "https://explore.anvilproject.dev.clevercanary.com";
export const GIT_HUB_REPO_URL = "https://github.com/anvilproject/anvil-portal";
const PORTAL_URL = "https://anvilproject.dev.clevercanary.com";
const SLOGAN = "NHGRI Analysis Visualization and Informatics Lab-space";

export function makeConfig(
  browserUrl: string,
  portalUrl: string,
  gitHubUrl: string
): SiteConfig {
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
    gitHubUrl,
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
        versionInfo: true,
      },
      header: {
        actions: C.Actions(),
        announcements,
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
              url: ROUTES.LEARN,
            },
            {
              label: "Datasets",
              menuItems: [
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
                {
                  description:
                    "Newly released studies not available in the AnVIL Data Explorer are accessible in DUOS.",
                  label: C.LabelIconMenuItem({
                    iconFontSize: "small",
                    label: "Early Access Studies",
                  }),
                  target: ANCHOR_TARGET.BLANK,
                  url: "https://duos.broadinstitute.org",
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
              flatten: FLATTEN.XS_ONLY,
              label: "More",
              menuItems: [
                {
                  label: "Consortia",
                  menuItems: [
                    {
                      label: "Overview",
                      selectedMatch: SELECTED_MATCH.EQUALS,
                      url: ROUTES.CONSORTIA,
                      visible: VISIBLE.MD_DOWN,
                    },
                    {
                      label: "CSER",
                      menuItems: buildMenuItems(CONSORTIA),
                      selectedMatch: SELECTED_MATCH.EQUALS,
                      url: `${ROUTES.CONSORTIA}/cser`,
                      visible: VISIBLE.MD_DOWN,
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
                  label: "AnVIL Champions",
                  url: ROUTES.ANVIL_CHAMPIONS,
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
                    {
                      ...SOCIALS.LINKEDIN,
                      icon: C.LinkedInIcon({}),
                      target: ANCHOR_TARGET.BLANK,
                    },
                  ],
                  url: "",
                  visible: VISIBLE.BETWEEN_SM_AND_LG,
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

const config: SiteConfig = makeConfig(
  EXPLORER_URL,
  PORTAL_URL,
  GIT_HUB_REPO_URL
);

export default config;
