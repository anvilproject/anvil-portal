import { SELECTED_MATCH } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { NavigationEntry } from "../../../../docs/common/entities";

/**
 * Retuns menu items for the navigation entry.
 * @param navigationEntry - Navigation entry.
 * @returns menu items.
 */
export function buildMenuItems(
  navigationEntry: NavigationEntry
): NavLinkItem[] {
  return navigationEntry.nodes.map(({ label, navigation: menuItems }) => {
    return {
      label,
      menuItems: menuItems?.map((m) => ({
        ...m,
        visible: { lg: false, md: false, sm: true, xs: true },
      })),
      selectedMatch: SELECTED_MATCH.EQUALS, // TODO update selectedMatch with findable-ui update.
      url: menuItems?.find(({ url }) => url)?.url ?? "",
    } as NavLinkItem;
  });
}
