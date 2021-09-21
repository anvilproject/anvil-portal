/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search bar component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// App dependencies
import SiteSearchForm from "../../site-search/site-search-form/site-search-form";

// Styles
import * as compStyles from "./site-search-bar.module.css";

function SiteSearchBar(props) {
  const { onSubmitSiteSearch, searchBarOpen } = props;

  return (
    <div
      className={classNames(
        { [compStyles.active]: searchBarOpen },
        compStyles.searchBar
      )}
    >
      <SiteSearchForm onSubmitSiteSearch={onSubmitSiteSearch} />
    </div>
  );
}

export default React.memo(SiteSearchBar);
