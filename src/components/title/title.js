/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - title component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextSiteSearch from "../site-search/context-site-search/context-site-search";

// Styles
import compStyles from "./title.module.css";

function Title(props) {

    const {title} = props;
    const {siteSearch} = useContext(ContextSiteSearch),
        {searchTerms} = siteSearch || {};

    return (
        <h1 className={compStyles.title}>
            <span>{title}</span>
            {searchTerms ? <span> for "{searchTerms ? searchTerms : null}"</span> : null}
        </h1>
    );
}

export default Title;
