/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - icon component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// Styles
import * as compStyles from "./icon.module.css";

function Icon(props) {
  const { breadcrumb, children, color, fontSize, showHover, showIcon } = props;
  const classNamesIcon = classNames(
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
