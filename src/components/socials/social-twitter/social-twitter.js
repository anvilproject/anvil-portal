/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - social twitter component.
 * Use of this component within markdown is possible.
 * <social-twitter url="https://example-url.com"></social-twitter>
 *
 * Props
 * -----
 * - url: twitter url utilized by <a> element.
 */

// Core dependencies
import React from "react";

// App dependencies
import Social from "../social/social";

// Images
import twitter from "../../../../images/logo-twitter.svg";

function SocialTwitter(props) {

    const {url} = props;

    return (
        <Social url={url}>
            <img alt={"Twitter"} src={twitter}/>
        </Social>
    );
}

export default SocialTwitter;
