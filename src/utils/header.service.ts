/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic header service.
 */

// App dependencies
import { MenuItem } from "../components/header/menu-item";
import { HeaderNavBarStaticQuery } from "../hooks/header-nav-bar-query";
import { HeaderNavSideBarStaticQuery } from "../hooks/header-nav-side-bar-query";

/**
 * Returns the header navigation nav bar links.
 * Any NCPI page will return links built specifically for NCPI pages, otherwise
 * the links from the static query are returned.
 *
 * @param ncpiPost
 */
export function getNavBarMenuItems(ncpiPost: boolean): MenuItem[] {
  /* Build header links for NCPI pages. */
  if (ncpiPost) {
    return [
      { name: "Overview", path: "/ncpi" },
      { name: "Datasets", path: "/ncpi/data" },
      { name: "Training", path: "/ncpi/training" },
    ];
  }

  /* Return header links for all other pages. */
  return HeaderNavBarStaticQuery();
}

/**
 * Returns the header navigation side bar links.
 * Any NCPI page will return links built specifically for NCPI pages, otherwise
 * the links from the static query are returned.
 *
 * @param ncpiPost
 */
export function getNavSideBarMenuItems(ncpiPost: boolean): MenuItem[] {
  /* Build header links for NCPI pages. */
  if (ncpiPost) {
    return [
      { name: "Overview", path: "/ncpi", subMenuItems: [] },
      { name: "Datasets", path: "/ncpi/data", subMenuItems: [] },
      { name: "Training", path: "/ncpi/training", subMenuItems: [] },
    ];
  }

  /* Returns the menu items, mapping any empty sub menu items to an empty array. */
  const menuItems = HeaderNavSideBarStaticQuery();
  return menuItems.map((menuItem: MenuItem) => {
    const { subMenuItems } = menuItem;
    const hasSubMenuItems = subMenuItems?.some(
      (subItem) => subItem.name && subItem.path
    );
    return {
      name: menuItem.name,
      path: menuItem.path,
      subMenuItems: hasSubMenuItems ? menuItem.subMenuItems : [],
    };
  });
}
