/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search bar component.
 */

// Core dependencies
import React from "react";

// App dependencies
import SiteSearchForm from "../../site-search/site-search-form/site-search-form";

// Styles
import compStyles from "./site-search-bar.module.css";

const classNames = require("classnames");

function SiteSearchBar(props) {
  const { onSubmitSiteSearch, searchBarOpen } = props;

  return (
    <div
      className={classNames(
        { [compStyles.expanded]: searchBarOpen },
        compStyles.searchBar
      )}
    >
      <SiteSearchForm
        onSubmitSiteSearch={onSubmitSiteSearch}
        searchBarOpen={searchBarOpen}
      />
    </div>
  );
}

export default React.memo(SiteSearchBar);
