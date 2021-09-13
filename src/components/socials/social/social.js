/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - social component.
 * Provides an anchor tag wrapper around socials.
 *
 * Props
 * -----
 * - url: social url utilized by <a> element.
 *
 * Children
 * --------
 * Children could be in the format:
 * <img alt="image alt" src={imgSrc}>
 *
 * For example,
 * <Social><img alt={"Twitter"} src={imgSrc}/><Social>
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./social.module.css";

function Social(props) {
  const { children, url } = props;

  return (
    <a className={compStyles.social} href={url} rel="noopener" target="_blank">
      {children}
    </a>
  );
}

export default Social;
