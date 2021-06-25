/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - socials component.
 * Wrapper for <social> components; facilitates flex styles to social icons.
 * Use of this component within markdown is possible.
 * <socials></socials>
 *
 * Props
 * -----
 * - articleBottom: a true value used by <article-socials> to apply additional wrapper styles.
 *
 * Children
 * --------
 * Children should be in the format:
 * <SocialTwitter url="https://example.com"/>
 *
 * For example,
 * <Socials><SocialTwitter url="https://example.com"/><Socials>
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./socials.module.css";

const classNames = require("classnames");

function Socials(props) {
  const { articleBottom, children } = props;

  return (
    <div
      className={classNames(
        { [compStyles.articleBottom]: articleBottom },
        compStyles.socials
      )}
    >
      {children}
    </div>
  );
}

export default Socials;
