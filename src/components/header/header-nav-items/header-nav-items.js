/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header nav items component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";
import ContextSiteSearch from "../../site-search/context-site-search/context-site-search";
import HeaderNavItem from "../header-nav-item/header-nav-item";
import * as HeaderService from "../../../utils/header.service";

// Styles
import compStyles from "./header-nav-items.module.css";

const classNames = require("classnames");

function HeaderNavItems(props) {

    const {ncpi} = props;
    const {menuOpen} = useContext(ContextAnVILPortal);
    const {searchBarOpen} = useContext(ContextSiteSearch);
    const classNamesHeaderNavItems = classNames(
        compStyles.headerNavItems,
        {[compStyles.menuOpen]: menuOpen},
        {[compStyles.searchBarOpen]: searchBarOpen});
    const headers = HeaderService.getHeaderLinks(ncpi);
    const showPartiallyActive = !ncpi;

    return (
        <ul className={classNamesHeaderNavItems}>
            {headers.map((header, h) => <HeaderNavItem key={h} header={header} partiallyActive={showPartiallyActive}/>)}
        </ul>
    );
}

export default HeaderNavItems;
