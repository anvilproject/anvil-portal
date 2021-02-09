/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - social youtube component.
 * Use of this component within markdown is possible.
 * <social-youtube url="https://example-url.com"></social-youtube>
 *
 * Props
 * -----
 * - url: youtube url utilized by <a> element.
 */

// Core dependencies
import React from "react";

// App dependencies
import Social from "../social/social";

// Images
import youtube from "../../../../images/logo-youtube-red.png";

// Styles
import compStyles from "./social-youtube.module.css";

function SocialYoutube(props) {

    const {url} = props;

    return (
        <Social imgSrc={youtube} media={"Youtube"} url={url}>
            <img className={compStyles.youtube} src={youtube} alt={"Youtube"}/>
        </Social>
    );
}

export default SocialYoutube;
