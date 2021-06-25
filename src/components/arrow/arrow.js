/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL arrow component.
 * Adds an arrow forward or arrow back around text.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./arrow.module.css";

const classNames = require("classnames");

function Arrow(props) {
  const { children, reverse } = props;
  const classNamesChild = children.props.className;
  const classNamesArrow = classNames(classNamesChild, compStyles.arrow, {
    [compStyles.reverse]: reverse
  });

  return React.cloneElement(children, { className: classNamesArrow });
}

export default Arrow;
