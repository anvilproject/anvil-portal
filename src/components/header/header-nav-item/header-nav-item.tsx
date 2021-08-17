/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header nav item component.
 */

// Core dependencies
import { Link } from "gatsby";
import React, { useEffect, useState } from "react";

// App dependencies
// eslint-disable-next-line import/no-cycle
import HeaderNavItems from "../header-nav-items/header-nav-items";
import { IMenuItem } from "../../menu-item/menu-item";

// Styles
import compStyles from "./header-nav-item.module.css";

const classNames = require("classnames");

interface HeaderNavItemProps {
  activePath: string;
  menuItem: IMenuItem;
  ncpi: boolean;
}

function HeaderNavItem(props: HeaderNavItemProps): JSX.Element {
  const { activePath, menuItem, ncpi } = props;
  const [activeMenu, setActiveMenu] = useState(false);
  const { name, path, subMenuItems } = menuItem;
  const menuItems = subMenuItems || [];
  const showSubMenuItems = subMenuItems && subMenuItems.length;
  const active = !showSubMenuItems && activePath === path;
  const classNamesActive = classNames({
    [compStyles.active]: activeMenu,
  });

  /* useEffect - componentDidMount/componentWillUnmount. */
  useEffect(() => {
    setActiveMenu(active);
  }, [active]);

  return (
    <li
      className={classNames(compStyles.headerNavItem, {
        [compStyles.ncpi]: ncpi,
      })}
    >
      <Link className={classNamesActive} to={path}>
        {name}
      </Link>
      {showSubMenuItems ? (
        <HeaderNavItems
          activePath={activePath}
          menuItems={menuItems}
          ncpi={ncpi}
        />
      ) : null}
    </li>
  );
}

export default HeaderNavItem;
