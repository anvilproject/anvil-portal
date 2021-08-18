/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL footer component.
 */

// Core dependencies
import { Link } from "gatsby";
import React, { useContext } from "react";

// App dependencies
import ContextSiteSearch from "../site-search/context-site-search/context-site-search";

// Images
import gitHub from "../../../images/logo-github.png";
import hhs from "../../../images/logo-hhs.svg";
import nhgri from "../../../images/logo-nhgri.svg";
import nih from "../../../images/logo-nih.svg";
import slack from "../../../images/logo-slack.svg";
import twitter from "../../../images/logo-twitter.png";
import usaGov from "../../../images/logo-usa-gov.png";
import youtube from "../../../images/logo-youtube.png";

// Styles
import compStyles from "./footer.module.css";
import globalStyles from "../../styles/global.module.css";

const classNames = require("classnames");

function Footer() {
  const { siteSearch } = useContext(ContextSiteSearch),
    { searchLoading } = siteSearch || {};

  return searchLoading ? null : (
    <div className={compStyles.footer}>
      <div
        className={classNames(
          globalStyles.container,
          compStyles.container,
          globalStyles.flex
        )}
      >
        <div className={compStyles.logos}>
          <div>
            <a
              href="https://www.genome.gov"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img className={compStyles.nhgri} src={nhgri} alt="nhgri" />
            </a>
          </div>
          <div>
            <a
              href="https://www.nih.gov"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img className={compStyles.nih} src={nih} alt="nih" />
            </a>
            <a
              href="https://www.hhs.gov"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img className={compStyles.hhs} src={hhs} alt="hhs" />
            </a>
            <a
              href="https://www.usa.gov"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img className={compStyles.usaGov} src={usaGov} alt="usa.gov" />
            </a>
          </div>
        </div>
        <div className={classNames(globalStyles.flex, compStyles.socials)}>
          <Link className={compStyles.link} to="/help">
            Help
          </Link>
          <Link className={compStyles.link} to="/privacy">
            Privacy
          </Link>
          <a
            href="https://twitter.com/useAnVIL"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={twitter} alt="twitter" />
          </a>
          <a
            href=" https://join.slack.com/t/anvil-community/shared_invite/zt-hsyfam1w-LXlCv~3vNLSfDj~qNd5uBg"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={slack} alt="slack" />
          </a>
          <a
            href="https://github.com/anvilproject"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={gitHub} alt="gitHub" />
          </a>
          <a
            className={compStyles.youtube}
            href="https://www.youtube.com/channel/UCBbHCj7kUogAMFyBAzzzfUw"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={youtube} alt="youtube" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
