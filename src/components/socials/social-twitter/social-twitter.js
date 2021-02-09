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
 * - bird: a true value toggles twitter bird logo, without any background color (false or no value reverts to white twitter brand logo with blue circle background).
 * - url: twitter url utilized by <a> element.
 */

// Core dependencies
import React from "react";

// App dependencies
import Social from "../social/social";

// Images
import twitter from "../../../../images/logo-twitter.svg";
import twitterCircle from "../../../../images/logo-twitter-circle.svg";

// Styles
import compStyles from "./social-twitter.module.css";

const classNames = require("classnames");

function SocialTwitter(props) {

    const {bird, url} = props;
    const imgSrc = bird ? twitter : twitterCircle;

    return (
        <Social url={url}>
            <img className={classNames({[compStyles.bird]: bird})} alt={"Twitter"} src={imgSrc}/>
        </Social>
    );
}

export default SocialTwitter;
