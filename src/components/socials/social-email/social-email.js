/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - social email component.
 *
 * Props
 * -----
 * - url: email url utilized by <a> element.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// App dependencies
import Social from "../social/social";

// Styles
import * as compStyles from "./social-email.module.css";

function SocialEmail(props) {
  const { url } = props;

  return (
    <Social url={url}>
      <span className={classNames("material-icons-round", compStyles.email)}>
        email
      </span>
    </Social>
  );
}

export default SocialEmail;
