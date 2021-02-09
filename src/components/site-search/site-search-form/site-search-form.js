/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search form component.
 */

// Core dependencies
import {navigate} from "gatsby";
import React, {useContext, useState} from "react";

// App dependencies
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";
import SiteSearchInput from "../site-search-input/site-search-input";
import * as AnvilGTMService from "../../../utils/anvil-gtm/anvil-gtm.service";

// Styles
import compStyles from "./site-search-form.module.css";

function SiteSearchForm() {

    const {onSetMenuOpen, onSetSiteSearchBarOpen, onSetSiteSearchTerms} = useContext(ContextAnVILPortal);
    const [query, setQuery] = useState("");

    const onHandleSubmit = (event) => {

        event.preventDefault();

        /* Only submit form if query is valid. */
        if ( query ) {

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
            onSetMenuOpen(false);
            
            /* Track search */
            AnvilGTMService.trackSiteSearch(query);
        }
    };

    return (
        <form className={compStyles.form} onSubmit={(e) => onHandleSubmit(e)}>
            <SiteSearchInput query={query} setQuery={setQuery}/>
        </form>
    )
}

export default SiteSearchForm;
