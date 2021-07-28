/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import HeaderHero from "./header-hero/header-hero";
import HeaderLogo from "./header-logo/header-logo";
import HeaderMenuButton from "./header-menu-button/header-menu-button";
import HeaderNavBar from "./header-nav-bar/header-nav-bar";
import HeaderNavItems from "./header-nav-items/header-nav-items";
import HeaderNavSideBar from "./header-nav-side-bar/header-nav-side-bar";
import HeaderNavSideBarHero from "./header-nav-side-bar-hero/header-nav-side-bar-hero";
import { MenuItem } from "./menu-item";
import ContextSiteSearch from "../site-search/context-site-search/context-site-search";
import SiteSearchBar from "../site-search/site-search-bar/site-search-bar";
import { Navigation } from "../../typings/navigation";
import * as HeaderService from "../../utils/header.service";

// Styles
import compStyles from "./header.module.css";
import globalStyles from "../../styles/global.module.css";

const classNames = require("classnames");

interface HeaderProps {
  navigation: Navigation;
  ncpi: boolean;
}

function Header(props: HeaderProps): JSX.Element {
  const { navigation, ncpi } = props;
  const { onSubmitSiteSearch, searchBarOpen } = useContext(ContextSiteSearch);
  const navBarMenuItems: MenuItem[] = HeaderService.getNavBarMenuItems(ncpi);
  const navSideBarMenuItems: MenuItem[] = HeaderService.getNavSideBarMenuItems(
    ncpi
  );
  const { menuPath, tabPath } = navigation || {};

  return (
    <div className={compStyles.header}>
      <div
        className={classNames(
          globalStyles.container,
          compStyles.headerContainer
        )}
      >
        <HeaderHero searchBarOpen={searchBarOpen}>
          <HeaderMenuButton />
          <HeaderLogo ncpi={ncpi} />
        </HeaderHero>
        <HeaderNavBar searchBarOpen={searchBarOpen}>
          <HeaderNavItems activePath={menuPath} menuItems={navBarMenuItems} />
        </HeaderNavBar>
        <HeaderNavSideBar>
          <HeaderNavSideBarHero>
            <HeaderLogo ncpi={ncpi} />
          </HeaderNavSideBarHero>
          <HeaderNavItems
            activePath={tabPath || menuPath}
            menuItems={navSideBarMenuItems}
          />
        </HeaderNavSideBar>
        <SiteSearchBar
          onSubmitSiteSearch={onSubmitSiteSearch}
          searchBarOpen={searchBarOpen}
        />
      </div>
    </div>
  );
}

export default Header;
