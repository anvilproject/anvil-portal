import { Header as DXHeader } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/header";
import { useMemo } from "react";
import { FEATURES } from "../../../../hooks/useFeatureFlag/common/entities";
import { useFeatureFlag } from "../../../../hooks/useFeatureFlag/useFeatureFlag";
import {
  Header as HeaderProps,
  NavLinkItem,
} from "../../../../site-config/common/entities";

export const Header = (headerProps: HeaderProps): JSX.Element => {
  const isFeatureFlag = useFeatureFlag(FEATURES.HEADER);
  const configuredHeaderProps = useMemo(
    () => configureHeader(headerProps, isFeatureFlag),
    [headerProps, isFeatureFlag]
  );
  return <DXHeader {...configuredHeaderProps} />;
};

/**
 * Returns the header properties for the site config and feature flag.
 * @param header - Site config header.
 * @param isFeatureFlag - Flag indicating if feature is available to user.
 * @returns header properties.
 */
function configureHeader(
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
