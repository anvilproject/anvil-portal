import { SiteConfig } from "../entities";
import logoAnvil from "../../../images/logo-anvil.png";
import { getDatasetsEnvironmentUrl } from "../../utils/environment/environment.service";

// Template constants
const slogan = "NHGRI Analysis Visualization and Informatics Lab-space";

const config: SiteConfig = {
  layout: {
    header: {
      authenticationEnabled: false,
      logo: {
        alt: slogan,
        height: 40,
        link: "/",
        src: logoAnvil,
      },
      navLinks: [
        {
          label: "Overview",
          url: "/overview",
        },
        {
          label: "Learn",
          url: "/learn",
        },
        {
          label: "Datasets",
          url: `${getDatasetsEnvironmentUrl()}data`,
        },
        {
          label: "Consortia",
          url: `${getDatasetsEnvironmentUrl()}consortia`,
        },
        {
          label: "News",
          url: "/news",
        },
        {
          label: "Events",
          url: "/events",
        },
        {
          label: "Team",
          url: "/team",
        },
        {
          label: "FAQ",
          url: "/faq",
        },
        {
          label: "Help",
          url: "/help",
        },
      ],
      searchEnabled: true,
      slogan,
      socials: [
        {
          type: "discourse",
          url: "https://help.anvilproject.org/",
        },
        {
          type: "twitter",
          url: "https://twitter.com/useAnVIL",
        },
        {
          type: "youtube",
          url: "https://www.youtube.com/channel/UCBbHCj7kUogAMFyBAzzzfUw",
        },
        {
          type: "github",
          url: "https://github.com/anvilproject",
        },
        {
          type: "slack",
          url: "https://join.slack.com/t/anvil-community/shared_invite/zt-hsyfam1w-LXlCv~3vNLSfDj~qNd5uBg",
        },
      ],
    },
  },
  search: {
    partners: [
      { label: "All Results", value: "" },
      { label: "AnVIL Site", value: "anvil-only" },
      { label: "Terra", value: "terra-only" },
      { label: "Gen3", value: "gen3-only" },
      { label: "Dockstore", value: "dockstore-only" },
      { label: "Bioconductor", value: "bioconductor-only" },
      { label: "Galaxy", value: "galaxy-only" },
    ],
    searchEngineId: process.env.GATSBY_GCSE_CX,
    searchPath: "/search",
  },
  theme: {
    palette: {
      primary: {
        dark: "#003E76",
        main: "#035C94",
      },
    },
  },
};

export default config;
