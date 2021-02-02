/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - site search input prefix component.
 * Wrapper for input search icon.
 */

// Core dependencies
import React from "react";

// App dependencies
import Icon from "../../icon/icon";

// Styles
import compStyles from "./site-search-input-prefix.module.css";

function SiteSearchInputPrefix() {

    return (
        <span className={compStyles.inputPrefix}>
            <Icon fontSize={20} showHover={false} showIcon={true}>search</Icon>
        </span>
    )
}

export default SiteSearchInputPrefix;

