/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header nav items component.
 */

// Core dependencies
import React from "react";

// App dependencies
import HeaderNavItem from "../header-nav-item/header-nav-item";
import * as HeaderService from "../../../utils/header.service";

// Styles
import compStyles from "./header-nav-items.module.css";

const classNames = require("classnames");

function HeaderNavItems(props) {

    const {menuOpen, ncpi} = props;
    const classNamesHeaderNavItems = classNames(compStyles.headerNavItems, {[compStyles.menuOpen]: menuOpen});
    const headers = HeaderService.getHeaderLinks(ncpi);
    const showPartiallyActive = !ncpi;

    return (
        <ul className={classNamesHeaderNavItems}>
            {headers.map((header, h) => <HeaderNavItem key={h} header={header} partiallyActive={showPartiallyActive}/>)}
        </ul>
    );
}

export default HeaderNavItems;
