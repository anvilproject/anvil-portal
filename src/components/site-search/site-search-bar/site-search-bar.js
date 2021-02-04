/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search bar component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";
import SiteSearchForm from "../../site-search/site-search-form/site-search-form";

// Styles
import compStyles from "./site-search-bar.module.css";

const classNames = require("classnames");

function SiteSearchBar() {

    const {searchBarOpen} = useContext(ContextAnVILPortal);

    return (
        <div className={classNames({[compStyles.expanded]: searchBarOpen}, compStyles.searchBar)}>
            <SiteSearchForm/>
        </div>
    )
}

export default React.memo(SiteSearchBar);
