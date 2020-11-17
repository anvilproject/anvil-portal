/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav item component.
 */

// Core dependencies
import {navigate} from "gatsby";
import React, {useState} from "react";

// App dependencies
import NavArrow from "../nav-arrow/nav-arrow";

// Styles
import compStyles from "./nav-item.module.css";

let classNames = require("classnames");

function NavItem(props) {

    const {docPath, item} = props,
        {key, name, path, secondaryLinks} = item;
    const [, , itemPrimaryKey] = docPath.split("/");
    const [, , keyPrimaryKey] = key.split("/");
    const [itemActive, ] = useState(docPath === key);
    const [itemButton, ] = useState(!!secondaryLinks);
    const [itemOpen, setItemOpen] = useState(keyPrimaryKey === itemPrimaryKey);
    const showArrow = secondaryLinks && secondaryLinks.length > 0;
    const showSecondaryLinks = secondaryLinks && itemOpen;
    const urlTo = path || key;
    const classNamesItem = classNames({[compStyles.active]: itemActive}, {[compStyles.button]: itemButton});

    const onHandleClick = () => {

        if ( secondaryLinks ) {

            setItemOpen(itemOpen => !itemOpen);
        }
        else {

            navigate(urlTo);
        }
    };

    return (
        <li className={compStyles.navItem}>
            <span className={classNamesItem} role={"presentation"} onClick={() => onHandleClick()}>
                <NavArrow rotate={itemOpen} showArrow={showArrow}/>
                <span>{name}</span>
            </span>
            {showSecondaryLinks ?
                <ul>
                    {secondaryLinks.map((nestedItem, k) => <NavItem key={k} docPath={docPath} item={nestedItem}/>)}
                </ul> : null}
        </li>
    );
}

export default React.memo(NavItem);
