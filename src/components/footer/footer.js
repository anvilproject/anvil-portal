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
                        <div><img className={compStyles.nhgri} src={nhgri} alt="nhgri"/></div>
                        <div>
                            <img className={compStyles.nih} src={nih} alt="nih"/>
                            <img className={compStyles.hhs} src={hhs} alt="hhs"/>
                            <img className={compStyles.usaGov} src={usaGov} alt="usa.gov"/>
                        </div>
                    </div>
                    <div className={classNames(globalStyles.flex, compStyles.socials)}>
                        <Link className={compStyles.link} to="/help">Help</Link>
                        <Link className={compStyles.link} to="/privacy">Privacy</Link>
                        <a href="https://twitter.com/useAnVIL" rel="noopener noreferrer" target="_blank">
                            <img src={twitter} alt="twitter"/></a>
                        <a href="https://gitter.im/anvil-project/Lobby" rel="noopener noreferrer" target="_blank">
                            <i className="material-icons-outlined">forum</i></a>
                        <a href="https://github.com/anvilproject" rel="noopener noreferrer" target="_blank">
                            <img src={gitHub} alt="gitHub"/></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
