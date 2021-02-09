/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - social linkedin component.
 *
 * Props
 * -----
 * - url: LinkedIn url utilized by <a> element.
 */

// Core dependencies
import React from "react";

// App dependencies
import Social from "../social/social";

// Images
import linkedin from "../../../../images/logo-linkedin.svg"

// Styles
import compStyles from "./social-linkedin.module.css";

function SocialLinkedIn(props) {

    const {url} = props;

    return (
        <Social url={url}>
            <img className={compStyles.linkedin} src={linkedin} alt={"LinkedIn"}/>
        </Social>
    );
}

export default SocialLinkedIn;
