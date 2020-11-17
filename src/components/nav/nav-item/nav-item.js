/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav item component.
 */

// Core dependencies
import {Link} from "gatsby";
import React from "react";

// Styles
import compStyles from "./nav-item.module.css";

let classNames = require("classnames");

function NavItem(props) {

    const {docPath, item} = props,
        {key, name, path, secondaryLinks} = item;
    const urlTo = path || key;

    const isActive = () => {

        return docPath === key;
    };

    return (
        <li className={compStyles.navItem}>
            <Link className={classNames({[compStyles.active]: isActive()})} to={urlTo}>{name}</Link>
            {secondaryLinks ?
                <ul>
                    {secondaryLinks.map((nestedItem, k) => <NavItem key={k} docPath={docPath} item={nestedItem}/>)}
                </ul> : null}
        </li>
    );
}

export default NavItem;
