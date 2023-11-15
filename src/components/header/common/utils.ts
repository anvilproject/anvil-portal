import { Header as HeaderProps, NavLinkItem } from "./entities";

/**
 * Returns the header navigation links for the site config and feature flag.
 * @param navLinks - Nav links.
 * @param isFeatureFlag - Flag indicating if feature is available to user.
 * @returns navigation links.
 */
function filterFeatureFlagNavigation(
  navLinks: NavLinkItem[],
  isFeatureFlag: boolean
): NavLinkItem[] {
  return navLinks.filter(
    ({ featureFlag }) =>
      featureFlag === undefined || featureFlag === isFeatureFlag
  );
}

/**
 * Returns the header properties for the site config and feature flag.
 * @param header - Site config header.
 * @param isFeatureFlag - Flag indicating if feature is available to user.
 * @returns header properties.
 */
export function configureHeader(
  header: HeaderProps,
  isFeatureFlag: boolean
): HeaderProps {
  const navLinks = filterFeatureFlagNavigation(header.navLinks, isFeatureFlag);
  return {
    ...header,
    navLinks,
  };
}

/**
 * Returns true if the given link is an internal link.
 * @param link - Link.
 * @returns true if the given link is an internal link.
 */
export function isClientSideNavigation(link: string): boolean {
  return /^\/(?!\/)/.test(link);
}
