/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search input component.
 */

// Core dependencies
import React, {useCallback, useEffect, useRef} from "react";
import {useLocation} from "@reach/router";

// App dependencies
import SiteSearchInputPrefix from "../site-search-input-prefix/site-search-input-prefix";
import SiteSearchInputSuffix from "../site-search-input-suffix/site-search-input-suffix";

// Styles
import compStyles from "./site-search-input.module.css";

function SiteSearchInput(props) {

    const {onSetSiteSearchBarOpen, onSetSiteSearchTerms, query, searchBarOpen, setQuery} = props;
    const currentLocation = useLocation();
    const refInput = useRef(null);

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
        else {

            refInput.current.focus();
        }
    };

    const onInputChange = (e) => {

        const {target} = e || {},
            {value: inputStr} = target || {};

        setQuery(inputStr);
    };

    const onInputClear = () => {

        /* Maintain <input> focus and clear value. */
        setQuery("");
    };

    const onInputFocus = () => {

        onSetSiteSearchBarOpen(true);
    };

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
        <SiteSearchInputPrefix/>
        <input className={compStyles.input}
               onBlur={(e) => onInputBlur(e)}
               onChange={(e) => onInputChange(e)}
               onFocus={() => onInputFocus()}
               placeholder={"Search"}
               ref={refInput}
               type="text"
               value={query}/>
        <SiteSearchInputSuffix onInputClear={onInputClear} query={query} searchBarOpen={searchBarOpen}/>
        </>
    )
}

export default SiteSearchInput;
