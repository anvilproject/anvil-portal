import {
  SOCIAL,
  Social,
} from "@clevercanary/data-explorer-ui/lib/components/common/Socials/socials";

export const BROWSER_URL = "https://anvil-portal.dev.clevercanary.com";
export const SLOGAN = "NHGRI Analysis Visualization and Informatics Lab-space";

export const socials: Social[] = [
  {
    ...SOCIAL.DISCOURSE,
    url: "https://help.anvilproject.org/",
  },
  {
    ...SOCIAL.TWITTER,
    url: "https://twitter.com/useAnVIL",
  },
  {
    ...SOCIAL.YOUTUBE,
    url: "https://www.youtube.com/channel/UCBbHCj7kUogAMFyBAzzzfUw",
  },
  {
    ...SOCIAL.GITHUB,
    url: "https://github.com/anvilproject",
  },
  {
    ...SOCIAL.SLACK,
    url: "https://join.slack.com/t/anvil-community/shared_invite/zt-hsyfam1w-LXlCv~3vNLSfDj~qNd5uBg",
  },
];
