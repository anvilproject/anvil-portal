/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search form component.
 */

// Core dependencies
import React from "react";

// App dependencies
import SiteSearchInput from "../site-search-input/site-search-input";

// Styles
import compStyles from "./site-search-form.module.css";

function SiteSearchForm(props) {
  const { onSubmitSiteSearch } = props;

  return (
    <form className={compStyles.form} onSubmit={(e) => onSubmitSiteSearch(e)}>
      <SiteSearchInput />
    </form>
  );
}

export default React.memo(SiteSearchForm);
