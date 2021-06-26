/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - site search input icon component.
 * Wrapper for input search icon.
 */

// Core dependencies
import React from "react";

// App dependencies
import Icon from "../../icon/icon";

// Styles
import compStyles from "./site-search-input-icon.module.css";

function SiteSearchInputIcon() {
  return (
    <span className={compStyles.searchIcon}>
      <Icon fontSize={20} showHover={false} showIcon={true}>
        search
      </Icon>
    </span>
  );
}

export default React.memo(SiteSearchInputIcon);
