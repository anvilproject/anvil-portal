import { HeaderProps } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/header";
import logoAnvil from "../../images/logoAnvil.png";
import { SOCIAL } from "@clevercanary/data-explorer-ui/lib/components/common/Socials/socials";
import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { BROWSER_URL, SLOGAN } from "./constants";

const header: HeaderProps = {
  authenticationEnabled: false,
  logo: { alt: SLOGAN, link: BROWSER_URL, src: logoAnvil, height: 40 },
  navAlignment: ELEMENT_ALIGNMENT.CENTER,
  navLinks: [
    {
      label: "Overview",
      url: `${BROWSER_URL}/overview`,
    },
    {
      label: "Learn",
      url: `${BROWSER_URL}/learn`,
    },
    {
      label: "Datasets",
      url: "/",
    },
    {
      label: "Consortia",
      url: "/consortia",
    },
    {
      label: "News",
      url: `${BROWSER_URL}/news`,
    },
    {
      label: "Events",
      url: `${BROWSER_URL}/events`,
    },
    {
      label: "More",
      menuItems: [
        {
          label: "Team",
          url: `${BROWSER_URL}/team`,
        },
        {
          label: "FAQ",
          url: `${BROWSER_URL}/faq`,
        },
        {
          label: "Help",
          url: `${BROWSER_URL}/help`,
        },
      ],
      url: "",
    },
  ],
  searchEnabled: true,
  searchURL: `${BROWSER_URL}/search`,
  slogan: SLOGAN,
  socials: [
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
  ],
};

export default header;
