/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - social twitter hashtag component.
 * Use of this component within markdown is possible.
 * <social-twitter-hashtag hashtag="hashtag"></social-twitter-hashtag>
 *
 * Props
 * -----
 * - hashtag: twitter hashtag (exclude "#").
 * - showBird: a true value will include the twitter bird branding logo alongside the handle.
 *
 * Note: When using the component within markdown, the prop showBird must be lowercase "showbird" and must have either a true or false string value assigned.
 */

// Core dependencies
import React from "react";

// App dependencies
import Social from "../social/social";

// Images
import twitter from "../../../../images/logo-twitter.svg";

// Styles
import * as compStyles from "./social-twitter-hashtag.module.css";

function SocialTwitterHashTag(props) {
  const { hashtag, showbird: showBird } = props;
  const showLogo = showBird === "true";
  const url = `https://twitter.com/hashtag/${hashtag}`;

  return (
    <Social url={url}>
      {showLogo ? <img alt={"Twitter"} src={twitter} /> : null}
      <span className={compStyles.hashtag}>#{hashtag}</span>
    </Social>
  );
}

export default SocialTwitterHashTag;
