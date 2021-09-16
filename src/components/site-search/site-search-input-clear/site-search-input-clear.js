/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - site search bar input clear component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// App dependencies
import Icon from "../../icon/icon";

// Styles
import * as compStyles from "./site-search-input-clear.module.css";

function SiteSearchInputClear(props) {
  const { onInputClear, searchBarOpen, showClear } = props;

  return (
    <span
      className={classNames(compStyles.clear, {
        [compStyles.active]: searchBarOpen && showClear,
      })}
      onClick={() => onInputClear()}
      role={"presentation"}
      tabIndex={"-1"}
    >
      <Icon fontSize={20} showHover={true} showIcon={true}>
        close
      </Icon>
    </span>
  );
}

export default React.memo(SiteSearchInputClear);
