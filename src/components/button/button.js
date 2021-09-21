/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - button component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// Styles
import * as compStyles from "./button.module.css";

function Button(props) {
  const { children, clickAction, dark, disabled, icon } = props;
  const darkButton = dark === "" || dark === true;
  const classNamesButton = classNames(
    compStyles.button,
    { [compStyles.dark]: darkButton },
    { [compStyles.disabled]: disabled },
    { [compStyles.icon]: icon }
  );

  const onHandleClickAction = () => {
    if (clickAction) {
      clickAction();
    }
  };

  return (
    <button
      className={classNamesButton}
      onClick={() => onHandleClickAction()}
      type="button"
    >
      {children}
    </button>
  );
}

export default Button;
