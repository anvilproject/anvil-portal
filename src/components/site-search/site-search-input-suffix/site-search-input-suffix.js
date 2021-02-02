/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - site search input suffix component.
 * Wrapper for input close button.
 */

// Core dependencies
import React from "react";

// App dependencies
import SiteSearchInputClear from "../site-search-input-clear/site-search-input-clear";

// Styles
import compStyles from "./site-search-input-suffix.module.css";

const classNames = require("classnames");

function SiteSearchInputSuffix(props) {

    const {onInputClear, query, searchBarOpen} = props;

    return (
        <span className={classNames(compStyles.inputSuffix, {[compStyles.show]: searchBarOpen && query})}>
            <SiteSearchInputClear onInputClear={onInputClear}/>
        </span>
    )
}

export default SiteSearchInputSuffix;

