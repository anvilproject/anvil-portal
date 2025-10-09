import type { MenuItem as NavMenuItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/components/NavigationMenuItems/navigationMenuItems";
import type { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { HeaderProps } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/header";

const GREGOR_ROUTE = "/consortia/gregor";
const PRIMED_ROUTE = "/consortia/primed";

/**
 * Returns the navigation array based on the feature flag.
 * @param isGREGoREnabled - Whether the GREGoR feature is enabled.
 * @param isPRIMEDEnabled - Whether the PRIMED feature is enabled.
 * @param navigation - The navigation array to return if the feature is enabled.
 * @returns The navigation array based on the feature flag.
 */
export function getNavigation(
  isGREGoREnabled: boolean,
  isPRIMEDEnabled: boolean,
  navigation: HeaderProps["navigation"]
): HeaderProps["navigation"] {
  if (!navigation) return;

  if (isGREGoREnabled && isPRIMEDEnabled) return navigation;

  const [left, center, right] = navigation;

  // Build the list of consortium base routes to exclude from the header navigation
  // when their corresponding feature flags are disabled (e.g. /consortia/gregor, /consortia/primed).
  const routes = [];
  if (!isGREGoREnabled) routes.push(GREGOR_ROUTE);
  if (!isPRIMEDEnabled) routes.push(PRIMED_ROUTE);

  return [
    removeNavItemsByRoute(left, routes),
    removeNavItemsByRoute(center, routes),
    removeNavItemsByRoute(right, routes),
  ];
}

/**
 * Recursively filters a navigation collection, removing any item whose `url`
 * exactly matches one of the provided base routes (e.g., "/consortia/gregor").
 * @param nav - NavLinkItem or MenuItem.
 * @param routes - List of absolute base routes to exclude (exact match only).
 * @returns Filtered navigation.
 */
function removeNavItemsByRoute(
  nav: NavLinkItem[] | NavMenuItem[] | undefined,
  routes: string[]
): NavLinkItem[] | NavMenuItem[] | undefined {
  if (!nav) return;
  const nextNav = nav.reduce<NavLinkItem[] | NavMenuItem[]>((acc, item) => {
    if (routes.includes(item.url)) return acc;
    const cloneItem: NavLinkItem = { ...item };
    cloneItem.menuItems = removeNavItemsByRoute(cloneItem.menuItems, routes);
    acc.push(cloneItem);
    return acc;
  }, []);
  return nextNav;
}
