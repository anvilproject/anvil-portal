/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header nav items component.
 */

// Core dependencies
import React from "react";

// App dependencies
// eslint-disable-next-line import/no-cycle
import HeaderNavItem from "../header-nav-item/header-nav-item";
import { IMenuItem } from "../../menu-item/menu-item";

// Styles
import compStyles from "./header-nav-items.module.css";

interface HeaderNavItemsProps {
  activePath: string;
  menuItems: IMenuItem[];
  ncpi: boolean;
}

function HeaderNavItems(props: HeaderNavItemsProps): JSX.Element {
  const { activePath, menuItems, ncpi } = props;

  return (
    <ul className={compStyles.headerNavItems}>
      {menuItems.map((menuItem) => (
        <HeaderNavItem
          key={menuItem.name}
          activePath={activePath}
          menuItem={menuItem}
          ncpi={ncpi}
        />
      ))}
    </ul>
  );
}

export default React.memo(HeaderNavItems);
