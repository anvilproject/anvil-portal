/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search input component.
 */

// Core dependencies
import React, {useCallback, useContext, useEffect, useRef} from "react";
import {useLocation} from "@reach/router";

// App dependencies
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";
import SiteSearchInputClear from "../site-search-input-clear/site-search-input-clear";
import SiteSearchInputIcon from "../site-search-input-icon/site-search-input-icon";

// Styles
import compStyles from "./site-search-input.module.css";

function SiteSearchInput(props) {

    const {query, setQuery} = props;
    const {onSetSiteSearchBarOpen, onSetSiteSearchTerms, searchBarOpen} = useContext(ContextAnVILPortal);
    const currentLocation = useLocation();
    const refInput = useRef(null);

    const onHandleKeyDown = useCallback((e) => {

        if ( e.key === "Escape" ) {

            onSetSiteSearchBarOpen(false);
        }
    }, [onSetSiteSearchBarOpen]);

    const onInitializeInputValue = useCallback(() => {

        const {state} = currentLocation || {},
            {siteSearchTerms} = state || {};

        if ( siteSearchTerms ) {

            /* Update AnVIL app provider and <input> value. */
            onSetSiteSearchTerms(siteSearchTerms);
            setQuery(siteSearchTerms);
        }
    }, [currentLocation, onSetSiteSearchTerms, setQuery]);

    const onInputBlur = (e) => {

        const {currentTarget, relatedTarget} = e || {},
            {parentNode: formEl} = currentTarget;
        const clearButtonClicked = formEl.contains(relatedTarget);

        if ( !clearButtonClicked ) {

            onSetSiteSearchBarOpen(false)
        }
    };

    const onInputChange = (e) => {

        const {target} = e || {},
            {value: inputStr} = target || {};

        setQuery(inputStr);
    };

    const onInputClear = () => {

        /* Clear value and maintain <input> focus. */
        setQuery("");
        refInput.current.focus();
    };

    const onInputFocus = () => {

        onSetSiteSearchBarOpen(true);
    };

    /* useEffect - componentDidMount, componentWillUnmount. */
    /* Add & remove event listener - "keydown". */
    useEffect(() => {

        document.addEventListener("keydown", onHandleKeyDown);
        return () => {

            document.removeEventListener("keydown", onHandleKeyDown);
        }
    }, [onHandleKeyDown]);

    /* useEffect - componentDidMount. */
    /* Initialize <input> with any previous search value. */
    useEffect(() => {

        onInitializeInputValue();
    }, [onInitializeInputValue]);

    /* useEffect - componentDidUpdate - searchBarOpen. */
    /* Blur input if search bar is collapsed. */
    useEffect(() => {

        if ( !searchBarOpen ) {

            refInput.current.blur();
        }
    }, [searchBarOpen]);

    return (
        <>
        <SiteSearchInputIcon/>
        <input className={compStyles.input}
               onBlur={(e) => onInputBlur(e)}
               onChange={(e) => onInputChange(e)}
               onFocus={() => onInputFocus()}
               placeholder={"Search"}
               ref={refInput}
               type="text"
               value={query}/>
        <SiteSearchInputClear onInputClear={onInputClear} query={query} searchBarOpen={searchBarOpen}/>
        </>
    )
}

export default SiteSearchInput;
