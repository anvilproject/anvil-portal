/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - button link component.
 * Provides styling to a link similar to a button.
 * Use of this component within markdown is possible.
 *
 * Children
 * --------
 * Children should have the following format:
 * <button-link>Button Text</button-link>
 *
 * For example,
 * <button-link href="https://galaxyproject.org/" target="_blank">Galaxy</button-link>
 *
 * Note
 * ----
 * - `href` and `target` are both required fields of <button-link> component.
 *
 * - `href` is the URL that the hyperlink points to e.g. "/learn" for an internal link or "https://galaxyproject.org/" for an external link.
 * - `target` is where to display the linked URL. Its value could be either: "_self" for internal links or "_blank" for external links.
 *
 * - `href` undefined will default to "/".
 * - `target` undefined will default to "_self".
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// Styles
import compStyles from "./button-link.module.css";

function ButtonLink(props) {
  const { children, href = "/", target = "_self" } = props;
  const linkExternal = target === "_blank";

  return linkExternal ? (
    <a className={compStyles.button} href={href} rel="noopener" target={target}>
      {children}
    </a>
  ) : (
    <Link className={compStyles.button} to={href}>
      {children}
    </Link>
  );
}

export default ButtonLink;
