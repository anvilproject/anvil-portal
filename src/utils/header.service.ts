/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic header service.
 */

// App dependencies
import { IMenuItem } from "../components/menu-item/menu-item";
import { Social } from "../components/socials/social/social.model";
import { SocialImage } from "../components/socials/social/social-image.model";
import { SocialUrlAnVIL } from "../components/socials/social/social-url-anvil.model";
import { SocialUrlNCPI } from "../components/socials/social/social-url-ncpi.model";
import { HeaderNavBarStaticQuery } from "../hooks/header-nav-bar-query";
import { HeaderNavSideBarStaticQuery } from "../hooks/header-nav-side-bar-query";

export function getHeaderSocials(ncpi: boolean) {
  /* Return socials for NCPI. */
  if (ncpi) {
    return [
      {
        imageSrc: SocialImage.YOUTUBE,
        name: Social.YOUTUBE,
        url: SocialUrlNCPI.YOUTUBE,
      },
    ];
  }

  /* Returns socials for AnVIL. */
  return [
    {
      imageSrc: SocialImage.TWITTER,
      name: Social.TWITTER,
      url: SocialUrlAnVIL.TWITTER,
    },
    {
      imageSrc: SocialImage.YOUTUBE,
      name: Social.YOUTUBE,
      url: SocialUrlAnVIL.YOUTUBE,
    },
    {
      imageSrc: SocialImage.DISCOURSE,
      name: Social.DISCOURSE,
      url: SocialUrlAnVIL.DISCOURSE,
    },
    {
      imageSrc: SocialImage.GITHUB,
      name: Social.GITHUB,
      url: SocialUrlAnVIL.GITHUB,
    },
    {
      imageSrc: SocialImage.SLACK,
      name: Social.SLACK,
      url: SocialUrlAnVIL.SLACK,
    },
  ];
}

/**
 * Returns the header navigation nav bar links.
 * Any NCPI page will return links built specifically for NCPI pages, otherwise
 * the links from the static query are returned.
 *
 * @param ncpiPost
 */
export function getNavBarMenuItems(ncpiPost: boolean): IMenuItem[] {
  /* Build header links for NCPI pages. */
  if (ncpiPost) {
    return [
      { name: "Overview", path: "/ncpi" },
      { name: "Platforms", path: "/ncpi/platforms" },
      { name: "Technologies", path: "/ncpi/technologies" },
      { name: "Datasets", path: "/ncpi/data" },
      { name: "Training", path: "/ncpi/training" },
      { name: "Updates", path: "/ncpi/progress-updates" },
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
export function getNavSideBarMenuItems(ncpiPost: boolean): IMenuItem[] {
  /* Build header links for NCPI pages. */
  if (ncpiPost) {
    return [
      { name: "Overview", path: "/ncpi", subMenuItems: [] },
      { name: "Platforms", path: "/ncpi/platforms" },
      { name: "Technologies", path: "/ncpi/technologies" },
      { name: "Datasets", path: "/ncpi/data", subMenuItems: [] },
      { name: "Training", path: "/ncpi/training", subMenuItems: [] },
      { name: "Updates", path: "/ncpi/progress-updates" },
    ];
  }

  /* Returns the menu items, mapping any empty sub menu items to an empty array. */
  const menuItems = HeaderNavSideBarStaticQuery();
  return menuItems.map((menuItem: IMenuItem) => {
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
