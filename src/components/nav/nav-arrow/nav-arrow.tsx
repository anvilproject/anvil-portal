/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav arrow component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// Styles
import * as compStyles from "./nav-arrow.module.css";

interface NavArrowProps {
  rotate: boolean;
  showArrow: boolean;
}

function NavArrow(props: NavArrowProps): JSX.Element {
  const { rotate, showArrow } = props;

  return showArrow ? (
    <span
      className={classNames(compStyles.arrow, "material-icons-round", {
        [compStyles.rotate]: rotate,
      })}
    >
      keyboard_arrow_right
    </span>
  ) : (
    <span className={compStyles.placeholder} />
  );
}

export default NavArrow;
