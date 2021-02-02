/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search form component.
 */

// Core dependencies
import {navigate} from "gatsby";
import React, {useState} from "react";

// App dependencies
import SiteSearchInput from "../site-search-input/site-search-input";

// Styles
import compStyles from "./site-search-form.module.css";

function SiteSearchForm(props) {

    const {onSetSiteSearchBarOpen, onSetSiteSearchTerms, searchBarOpen, setMenuOpen, siteSearchTerms} = props;
    const [query, setQuery] = useState("");

    const onHandleSubmit = (event) => {

        event.preventDefault();

        /* Only submit form if query is valid. */
        if ( query && query !== siteSearchTerms ) {

            /* Update AnVIL app provider with new search term. */
            onSetSiteSearchTerms(query);

            /* Set the search params. */
            const params = new URLSearchParams();
            params.set("q", query);

            /* Navigate with params. */
            navigate(`/search?${params.toString()}`, {state: {siteSearchTerms: query}});

            /* Close search bar and remove <input> focus. */
            onSetSiteSearchBarOpen(false);

            /* Close header menu. */
            setMenuOpen(false);
        }
    };

    return (
        <form className={compStyles.form} onSubmit={(e) => onHandleSubmit(e)}>
            <SiteSearchInput onSetSiteSearchBarOpen={onSetSiteSearchBarOpen}
                             onSetSiteSearchTerms={onSetSiteSearchTerms}
                             query={query}
                             searchBarOpen={searchBarOpen}
                             setQuery={setQuery}/>
        </form>
    )
}

export default SiteSearchForm;
