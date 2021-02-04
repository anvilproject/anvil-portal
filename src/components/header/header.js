/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header component.
 */

// Core dependencies
import React from "react";

// App dependencies
import HeaderLogo from "./header-logo/header-logo";
import HeaderMenuButton from "./header-menu-button/header-menu-button";
import HeaderNavItems from "./header-nav-items/header-nav-items";
import SiteSearchBar from "../site-search/site-search-bar/site-search-bar";

// Styles
import compStyles from "./header.module.css";
import globalStyles from "../../styles/global.module.css";

function Header(props) {

    const {ncpi} = props;

    return (
        <div className={compStyles.header}>
            <div className={globalStyles.container}>
                <HeaderLogo ncpi={ncpi}/>
                <HeaderNavItems ncpi={ncpi}/>
                <SiteSearchBar/>
                <HeaderMenuButton/>
            </div>
        </div>
    );
}

export default Header;
