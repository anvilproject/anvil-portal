/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search button component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import Button from "../../button/button";
import ContextSiteSearch from "../context-site-search/context-site-search";
import Icon from "../../icon/icon";

// Styles
import * as compStyles from "./site-search-button.module.css";

function SiteSearchButton(): JSX.Element {
  const { onSetSiteSearchBarOpen } = useContext(ContextSiteSearch);

  return (
    <div className={compStyles.searchButton}>
      <Button clickAction={() => onSetSiteSearchBarOpen(true)}>
        <Icon showHover={false} showIcon>
          search
        </Icon>
      </Button>
    </div>
  );
}

export default SiteSearchButton;
