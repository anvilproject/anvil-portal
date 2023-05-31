import { FooterProps } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Footer/footer";
import logoHhs from "images/logoHhs.svg";
import logoNhgri from "images/logoNhgri.svg";
import logoNih from "images/logoNih.svg";
import logoUsagov from "images/logoUsagov.png";
import { BROWSER_URL, socials } from "./constants";

const footer: FooterProps = {
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
      url: `${BROWSER_URL}/help`,
    },
    {
      label: "Privacy",
      url: `${BROWSER_URL}/privacy`,
    },
  ],
  socials,
};

export default footer;
