/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import HeaderBranding from "./header-branding/header-branding";
import HeaderHero from "./header-hero/header-hero";
import HeaderLogo from "./header-logo/header-logo";
import HeaderMenuButton from "./header-menu-button/header-menu-button";
import HeaderNavBar from "./header-nav-bar/header-nav-bar";
import HeaderNavItems from "./header-nav-items/header-nav-items";
import HeaderNavSideBar from "./header-nav-side-bar/header-nav-side-bar";
import HeaderNavSideBarHero from "./header-nav-side-bar-hero/header-nav-side-bar-hero";
import HeaderSocials from "./header-socials/header-socials";
import { IMenuItem } from "../menu-item/menu-item";
import { INavigation } from "../navigation/navigation";
import ContextSiteSearch from "../site-search/context-site-search/context-site-search";
import SiteSearchBar from "../site-search/site-search-bar/site-search-bar";
import SiteSearchButton from "../site-search/site-search-button/site-search-button";
import * as HeaderService from "../../utils/header.service";

// Styles
import compStyles from "./header.module.css";

interface HeaderProps {
  navigation: INavigation;
  ncpi: boolean;
}

function Header(props: HeaderProps): JSX.Element {
  const { navigation, ncpi } = props;
  const { onSubmitSiteSearch, searchBarOpen } = useContext(ContextSiteSearch);
  const socials = HeaderService.getHeaderSocials(ncpi);
  const navBarMenuItems: IMenuItem[] = HeaderService.getNavBarMenuItems(ncpi);
  const navSideBarMenuItems: IMenuItem[] =
    HeaderService.getNavSideBarMenuItems(ncpi);
  const { menuPath, tabPath } = navigation || {};

  return (
    <div className={compStyles.header}>
      <HeaderHero>
        <HeaderLogo ncpi={ncpi} />
        <HeaderBranding ncpi={ncpi} />
        <SiteSearchBar
          onSubmitSiteSearch={onSubmitSiteSearch}
          searchBarOpen={searchBarOpen}
        />
        <HeaderSocials ncpi={ncpi} sideBar={false} socials={socials} />
        <SiteSearchButton />
        <HeaderMenuButton />
      </HeaderHero>
      <HeaderNavBar>
        <HeaderNavItems
          activePath={menuPath}
          ncpi={ncpi}
          menuItems={navBarMenuItems}
        />
      </HeaderNavBar>
      <HeaderNavSideBar>
        <HeaderNavSideBarHero>
          <HeaderLogo ncpi={ncpi} />
        </HeaderNavSideBarHero>
        <HeaderNavItems
          activePath={tabPath || menuPath}
          menuItems={navSideBarMenuItems}
          ncpi={ncpi}
        />
        <HeaderSocials ncpi={ncpi} sideBar socials={socials} />
      </HeaderNavSideBar>
    </div>
  );
}

export default Header;
