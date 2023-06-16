import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import logoAnvil from "images/logoAnvil.png";
import logoHhs from "images/logoHhs.svg";
import logoNhgri from "images/logoNhgri.svg";
import logoNih from "images/logoNih.svg";
import logoUsagov from "images/logoUsagov.png";
import { socials } from "./constants";

export const PORTAL_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";
const SLOGAN = "NHGRI Analysis Visualization and Informatics Lab-space";

const config: SiteConfig = {
  analytics: {
    gtmAuth: "dn4W-jqWUyNBj6ON0Ic_wA", // GTM environment-specific
    gtmId: "GTM-KMGCR8F",
    gtmPreview: "env-65",
  },
  browserURL: "",
  dataSource: {
    url: "",
  },
  entities: [],
  explorerTitle: "",
  layout: {
    footer: {
      logos: [
        {
          alt: "nhgri",
          height: 24,
          link: "https://www.genome.gov/",
          src: logoNhgri,
        },
        {
          alt: "nih",
          height: 24,
          link: "https://www.nih.gov/",
          src: logoNih,
        },
        {
          alt: "hhs",
          height: 32,
          link: "https://www.hhs.gov/",
          src: logoHhs,
        },
        {
          alt: "hhs",
          height: 32,
          link: "https://www.usa.gov/",
          src: logoUsagov,
        },
      ],
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
      authenticationEnabled: false,
      logo: { alt: "The AnVIL", height: 40, link: PORTAL_URL, src: logoAnvil },
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
          label: "Datasets",
          url: `${PORTAL_URL}/data`,
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
