/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav item component.
 */

// Core dependencies
import { navigate } from "gatsby";
import React, { useCallback, useEffect, useState } from "react";

// App dependencies
import NavArrow from "../nav-arrow/nav-arrow";

// Styles
import compStyles from "./nav-item.module.css";

let classNames = require("classnames");

function NavItem(props) {
  const { docPath, navItem } = props,
    { file, name, navItems, path, slugs } = navItem || {};
  const [itemActive] = useState(docPath === file);
  const [itemButton] = useState(!file);
  const [itemOpen, setItemOpen] = useState(false);
  const showArrow = navItems && navItems.length > 0;
  const showNestedLinks = navItems && itemOpen;
  const classNamesItem = classNames(
    { [compStyles.active]: itemActive },
    { [compStyles.button]: itemButton }
  );

  const initializeNavItem = useCallback(() => {
    const nestedSlug = slugs && slugs.includes(docPath);
    setItemOpen(nestedSlug);
  }, [docPath, slugs]);

  const onHandleClick = () => {
    if (navItems) {
      setItemOpen(itemOpen => !itemOpen);
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    initializeNavItem();
  }, [initializeNavItem]);

  return (
    <li className={compStyles.navItem}>
      <span
        className={classNamesItem}
        role={"presentation"}
        onClick={() => onHandleClick()}
      >
        <NavArrow rotate={itemOpen} showArrow={showArrow} />
        <span>{name}</span>
      </span>
      {showNestedLinks ? (
        <ul>
          {navItems.map((nestedItem, k) => (
            <NavItem key={k} docPath={docPath} navItem={nestedItem} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default React.memo(NavItem);
