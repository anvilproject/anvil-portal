/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL footer component.
 */

// Core dependencies
import {Link} from "gatsby";
import React from "react";

// Images
import gitHub from "../../../images/logo-git-hub.png";
import hhs from "../../../images/logo-hhs.svg";
import nhgri from "../../../images/logo-nhgri.svg";
import nih from "../../../images/logo-nih.svg";
import slack from "../../../images/logo-slack.svg";
import twitter from "../../../images/logo-twitter.png";
import usaGov from "../../../images/logo-usa-gov.png";

// Styles
import compStyles from "./footer.module.css";
import globalStyles from "../../styles/global.module.css";

let classNames = require("classnames");

class Footer extends React.Component {

    render() {
        return (
            <div className={compStyles.footer}>
                <div className={classNames(globalStyles.container, compStyles.container, globalStyles.flex)}>
                    <div className={compStyles.logos}>
                        <div>
                            <a href="https://www.genome.gov" rel="noopener noreferrer" target="_blank"><img className={compStyles.nhgri} src={nhgri} alt="nhgri"/></a>
                        </div>
                        <div>
                            <a href="https://www.nih.gov" rel="noopener noreferrer" target="_blank"><img className={compStyles.nih} src={nih} alt="nih"/></a>
                            <a href="https://www.hhs.gov" rel="noopener noreferrer" target="_blank"><img className={compStyles.hhs} src={hhs} alt="hhs"/></a>
                            <a href="https://www.usa.gov" rel="noopener noreferrer" target="_blank"><img className={compStyles.usaGov} src={usaGov} alt="usa.gov"/></a>
                        </div>
                    </div>
                    <div className={classNames(globalStyles.flex, compStyles.socials)}>
                        <Link className={compStyles.link} to="/help">Help</Link>
                        <Link className={compStyles.link} to="/privacy">Privacy</Link>
                        <a href="https://twitter.com/useAnVIL" rel="noopener noreferrer" target="_blank">
                            <img src={twitter} alt="twitter"/></a>
                        <a href="https://anvil-community.slack.com/join/shared_invite/zt-fyn7c68g-PTWj5uszvyD6D7N6ab2iMQ#/" rel="noopener noreferrer" target="_blank">
                            <img src={slack} alt="slack"/></a>
                        <a href="https://github.com/anvilproject" rel="noopener noreferrer" target="_blank">
                            <img src={gitHub} alt="gitHub"/></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
