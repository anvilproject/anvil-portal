/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search bar component.
 */

// Core dependencies
import React, {useCallback, useContext, useEffect} from "react";

// App dependencies
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";
import SiteSearchForm from "../../site-search/site-search-form/site-search-form";

// Styles
import compStyles from "./site-search-bar.module.css";

const classNames = require("classnames");

function SiteSearchBar(props) {

    const {onSetSiteSearchBarOpen, searchBarOpen, setMenuOpen} = props;
    const {onSetSiteSearchTerms, siteSearchTerms} = useContext(ContextAnVILPortal);

    const onHandleKeyDown = useCallback((e) => {

        if ( e.key === "Escape" ) {

            onSetSiteSearchBarOpen(false);
        }
    }, [onSetSiteSearchBarOpen]);

    /* useEffect - componentDidMount, componentWillUnmount. */
    /* Add & remove event listener - "keydown". */
    useEffect(() => {

        document.addEventListener("keydown", onHandleKeyDown);
        return () => document.removeEventListener("keydown", onHandleKeyDown);
    }, [onHandleKeyDown]);

    return (
        <div className={classNames({[compStyles.expanded]: searchBarOpen}, compStyles.searchBar)}>
            <SiteSearchForm onSetSiteSearchBarOpen={onSetSiteSearchBarOpen}
                            onSetSiteSearchTerms={onSetSiteSearchTerms}
                            searchBarOpen={searchBarOpen}
                            setMenuOpen={setMenuOpen}
                            siteSearchTerms={siteSearchTerms}/>
        </div>
    )
}

export default React.memo(SiteSearchBar);
