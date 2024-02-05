import logoAnvil from "../../../images/logo-anvil.png";
import { DiscourseIcon } from "../../components/common/custom-icon/components/discourse-icon/discourse-icon";
import { GitHubIcon } from "../../components/common/custom-icon/components/git-hub-icon/git-hub-icon";
import { SlackIcon } from "../../components/common/custom-icon/components/slack-icon/slack-icon";
import { XIcon } from "../../components/common/custom-icon/components/x-icon/x-icon";
import { YouTubeIcon } from "../../components/common/custom-icon/components/you-tube-icon/you-tube-icon";
import { LabelIconMenuItem } from "../../components/header/components/nav-link-menu/components/label-icon-menu-item/label-icon-menu-item";
import { Target } from "../../components/target/target.model";
import { getDatasetsEnvironmentUrl } from "../../utils/environment/environment.service";
import { getExploreURL } from "../../utils/explore.service";
import { SiteConfig } from "../entities";

// Template constants
const slogan = "NHGRI Analysis Visualization and Informatics Lab-space";

const config: SiteConfig = {
  layout: {
    header: {
      authenticationEnabled: false,
      logo: {
        alt: slogan,
        height: 40,
        link: getDatasetsEnvironmentUrl(),
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
          menuItems: [
            {
              description:
                "An open-access view of studies, workspaces, and consortia.",
              label: "Catalog",
              url: `${getDatasetsEnvironmentUrl()}data`,
            },
            {
              description:
                "Build, download, and export cross-study cohorts of open and managed access data.",
              label: LabelIconMenuItem({
                iconFontSize: "small",
                label: "Explorer",
              }),
              target: Target.BLANK,
              url: getExploreURL(),
            },
          ],
          url: "",
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
          Icon: DiscourseIcon,
          label: "Discourse",
          url: "https://help.anvilproject.org/",
        },
        {
          Icon: XIcon,
          label: "X",
          url: "https://twitter.com/useAnVIL",
        },
        {
          Icon: YouTubeIcon,
          label: "YouTube",
          url: "https://www.youtube.com/channel/UCBbHCj7kUogAMFyBAzzzfUw",
        },
        {
          Icon: GitHubIcon,
          label: "GitHub",
          url: "https://github.com/anvilproject",
        },
        {
          Icon: SlackIcon,
          label: "Slack",
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
