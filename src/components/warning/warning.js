/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - warning component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./warning.module.css";

function Warning(props) {
  const { children } = props;

  return <p className={compStyles.warning}>{children}</p>;
}

export default Warning;
