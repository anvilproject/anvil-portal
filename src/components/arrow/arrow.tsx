/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL arrow component.
 * Adds an arrow forward or arrow back around text.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// Styles
import * as compStyles from "./arrow.module.css";

interface ArrowProps {
  children: React.ReactElement;
  reverse: boolean;
}

function Arrow(props: ArrowProps): JSX.Element {
  const { children, reverse } = props;
  const classNamesChild = children.props.className;
  const classNamesArrow = classNames(classNamesChild, compStyles.arrow, {
    [compStyles.reverse]: reverse,
  });

  return React.cloneElement(children, { className: classNamesArrow });
}

export default Arrow;
