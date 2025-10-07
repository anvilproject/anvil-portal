import type { MenuItem as NavMenuItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/components/NavigationMenuItems/navigationMenuItems";
import type { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { HeaderProps } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/header";

const GREGOR_LABEL = "GREGoR" as const;

/**
 * Returns the navigation array based on the feature flag.
 * @param isGREGoREnabled - Whether the GREGoR feature is enabled.
 * @param navigation - The navigation array to return if the feature is enabled.
 * @returns The navigation array based on the feature flag.
 */
export function getNavigation(
  isGREGoREnabled: boolean,
  navigation: HeaderProps["navigation"]
): HeaderProps["navigation"] {
  if (!navigation) return;

  if (isGREGoREnabled) return navigation;

  const [left, center, right] = navigation;

  return [removeGREGoR(left), removeGREGoR(center), removeGREGoR(right)];
}

/**
 * Recursively searching for the GREGoR menu item and removing it.
 * @param nav - Navigation array.
 * @returns Filtered navigation array.
 */
function removeGREGoR(
  nav: NavLinkItem[] | NavMenuItem[] | undefined
): NavLinkItem[] | NavMenuItem[] | undefined {
  if (!nav) return;
  const nextNav = nav.reduce<NavLinkItem[] | NavMenuItem[]>((acc, item) => {
    if (item.label === GREGOR_LABEL) return acc;
    const cloneItem: NavLinkItem = { ...item };
    cloneItem.menuItems = removeGREGoR(cloneItem.menuItems);
    acc.push(cloneItem);
    return acc;
  }, []);
  return nextNav;
}
