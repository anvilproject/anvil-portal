/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - social link component.
 * Use of this component within markdown is possible.
 * <social-link url="https://example-url.com"></social-link>
 *
 * Simple display of html <a> element with specified url displayed as hyperlink text.
 * Opens a new browser window.
 *
 * Props
 * -----
 * - url: social url utilized by <a> element.
 */

// Core dependencies
import React from "react";

function SocialLink(props) {
  const { url } = props;

  return (
    <a href={url} rel="noopener" target="_blank">
      {url}
    </a>
  );
}

export default SocialLink;
