/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search bar component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextSiteSearch from "../context-site-search/context-site-search";
import SiteSearchForm from "../../site-search/site-search-form/site-search-form";

// Styles
import compStyles from "./site-search-bar.module.css";

const classNames = require("classnames");

function SiteSearchBar() {

    const {searchBarOpen} = useContext(ContextSiteSearch);

    return (
        <div className={classNames({[compStyles.expanded]: searchBarOpen}, compStyles.searchBar)}>
            <SiteSearchForm/>
        </div>
    )
}

export default React.memo(SiteSearchBar);
