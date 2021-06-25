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
import React from "react";

// App dependencies
import Social from "../social/social";

// Styles
import compStyles from "./social-email.module.css";

const classNames = require("classnames");

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
