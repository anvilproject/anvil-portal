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

    const {docPath, nav} = props;

    return (
        <ul className={compStyles.navList}>
            {nav.map((navItem, i) => <NavItem key={i} docPath={docPath} item={navItem}/>)}
        </ul>
    );
}

export default Nav;
