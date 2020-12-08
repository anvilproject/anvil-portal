/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav list component.
 */

// Core dependencies
import React from "react";

// App dependencies
import NavItem from "../nav-item/nav-item";

// Styles
import compStyles from "./nav-list.module.css";

function Nav(props) {

    const {docPath, navItems} = props;

    return (
        <ul className={compStyles.navList}>
            {navItems.map((navItem, i) => <NavItem key={i} docPath={docPath} navItem={navItem}/>)}
        </ul>
    );
}

export default Nav;
