/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav items component.
 */

// Core dependencies
import React from "react";

// App dependencies
import { INavItem } from "../../navigation/navigation";
import NavItem from "../nav-item/nav-item";

// Styles
import * as compStyles from "./nav-items.module.css";

interface NavItemsProps {
  docPath: string;
  navItems: INavItem[];
}
function NavItems(props: NavItemsProps): JSX.Element {
  const { docPath, navItems } = props;

  return (
    <ul className={compStyles.navItems}>
      {navItems.map((navItem) => (
        <NavItem key={navItem.name} docPath={docPath} navItem={navItem} />
      ))}
    </ul>
  );
}

export default NavItems;
