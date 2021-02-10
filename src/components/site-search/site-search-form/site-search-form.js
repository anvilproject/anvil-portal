/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search form component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextSiteSearch from "../context-site-search/context-site-search";
import SiteSearchInput from "../site-search-input/site-search-input";

// Styles
import compStyles from "./site-search-form.module.css";

function SiteSearchForm() {

    const {onSubmitSiteSearch} = useContext(ContextSiteSearch);

    return (
        <form className={compStyles.form} onSubmit={(e) => onSubmitSiteSearch(e)}>
            <SiteSearchInput/>
        </form>
    )
}

export default SiteSearchForm;
