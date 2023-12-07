import logoNcpi from "../../../images/logo-ncpi.png";
import { GitHubIcon } from "../../components/common/custom-icon/components/git-hub-icon/git-hub-icon";
import { SlackIcon } from "../../components/common/custom-icon/components/slack-icon/slack-icon";
import { YouTubeIcon } from "../../components/common/custom-icon/components/you-tube-icon/you-tube-icon";
import { getDatasetsEnvironmentUrl } from "../../utils/environment/environment.service";
import { SiteConfig } from "../entities";

// Template constants
const slogan = "NIH Cloud Platform Interoperability Effort";

const config: SiteConfig = {
  layout: {
    header: {
      authenticationEnabled: false,
      logo: {
        alt: slogan,
        height: 40,
        link: "/ncpi",
        src: logoNcpi,
      },
      navLinks: [
        { label: "Overview", url: "/ncpi" },
        { label: "Platforms", url: "/ncpi/platforms" },
        { label: "Technologies", url: "/ncpi/technologies" },
        {
          label: "Datasets",
          url: `${getDatasetsEnvironmentUrl()}ncpi/data`,
        },
        {
          label: "Demonstration Projects",
          url: "/ncpi/demonstration-projects",
        },
        { label: "Training", url: "/ncpi/training" },
        { label: "Updates", url: "/ncpi/progress-updates" },
      ],
      searchEnabled: true,
      slogan,
      socials: [
        {
          Icon: YouTubeIcon,
          label: "YouTube",
          url: "https://www.youtube.com/channel/UCJvPdDZOxJvOwObfnZ8X3gA",
        },
        {
          Icon: GitHubIcon,
          label: "GitHub",
          url: "https://github.com/NIH-NCPI/",
        },
        {
          Icon: SlackIcon,
          label: "Slack",
          url: "https://nihcloudplatforms.slack.com/",
        },
      ],
    },
  },
  search: {
    partners: [
      { label: "All Results", value: "" },
      { label: "NCPI Site", value: "ncpi-only" },
      { label: "AnVIL", value: "AnVIL" },
      { label: "BDC", value: "bdc" },
      { label: "CRDC", value: "crdc" },
      { label: "Kids First", value: "kf" },
    ],
    searchEngineId: process.env.GATSBY_NCPI_GCSE_CX,
    searchPath: "/ncpi/search",
  },
  theme: {
    palette: {
      primary: {
        dark: "#003E76",
        main: "#1b578c",
      },
    },
  },
};

export default config;
