/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - icon component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./icon.module.css";

const classNames = require("classnames");

function Icon(props) {
  const {
    blueDark,
    breadcrumb,
    children,
    color,
    fontSize,
    showHover,
    showIcon
  } = props;
  const classNamesIcon = classNames(
    { [compStyles.blueDark]: blueDark },
    { [compStyles.breadcrumb]: breadcrumb },
    { [compStyles.hover]: showHover },
    compStyles.icon,
    "material-icons-round",
    { [compStyles.show]: showIcon }
  );
  const iconColor = color ? `var(${color})` : null;
  const size = fontSize ? `${fontSize}px` : "24px";

  return (
    <i className={classNamesIcon} style={{ color: iconColor, fontSize: size }}>
      {children}
    </i>
  );
}

export default Icon;
