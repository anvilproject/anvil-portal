/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - site search bar input clear component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Icon from "../../icon/icon";

// Styles
import compStyles from "./site-search-input-clear.module.css";

const classNames = require("classnames");

function SiteSearchInputClear(props) {

    const {onInputClear, query, searchBarOpen} = props;

    return (
        <span className={classNames(compStyles.clear, {[compStyles.active]: searchBarOpen && query})}
              onClick={() => onInputClear()}
              role={"presentation"}
              tabIndex={"-1"}>
            <Icon fontSize={20} showHover={true} showIcon={true}>close</Icon>
        </span>
    )
}

export default SiteSearchInputClear;
