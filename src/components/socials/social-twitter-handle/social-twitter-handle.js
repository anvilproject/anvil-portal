/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - social twitter handle component.
 * Use of this component within markdown is possible.
 * <social-twitter-handle handle="handle" showbird="true"></social-twitter-handle>
 *
 * Props
 * -----
 * - handle: twitter handle (exclude "@").
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
import compStyles from "./social-twitter-handle.module.css";

function SocialTwitterHandle(props) {
  const { handle, showbird: showBird } = props;
  const showLogo = showBird === "true";
  const url = `https://twitter.com/${handle}`;

  return (
    <Social url={url}>
      {showLogo ? <img alt={"Twitter"} src={twitter} /> : null}
      <span className={compStyles.handle}>@{handle}</span>
    </Social>
  );
}

export default SocialTwitterHandle;
