import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { HeaderProps } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/header";
import logoAnvil from "images/logoAnvil.png";
import { BROWSER_URL, SLOGAN, socials } from "./constants";

const header: HeaderProps = {
  authenticationEnabled: false,
  logo: { alt: "The AnVIL", link: BROWSER_URL, src: logoAnvil, height: 40 },
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
  socials,
};

export default header;
