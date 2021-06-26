/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextAnVILPortal from "../context-anvil-portal/context-anvil-portal";
import HeaderLogo from "./header-logo/header-logo";
import HeaderMenuButton from "./header-menu-button/header-menu-button";
import HeaderNavItems from "./header-nav-items/header-nav-items";
import ContextSiteSearch from "../site-search/context-site-search/context-site-search";
import SiteSearchBar from "../site-search/site-search-bar/site-search-bar";

// Styles
import compStyles from "./header.module.css";
import globalStyles from "../../styles/global.module.css";

function Header(props) {
  const { ncpi } = props;
  const { breakpoints, menuOpen } = useContext(ContextAnVILPortal);
  const { onSubmitSiteSearch, searchBarOpen } = useContext(ContextSiteSearch);

  return (
    <div className={compStyles.header}>
      <div className={globalStyles.container}>
        <HeaderLogo ncpi={ncpi} searchBarOpen={searchBarOpen} />
        <HeaderNavItems
          breakpoints={breakpoints}
          menuOpen={menuOpen}
          ncpi={ncpi}
          searchBarOpen={searchBarOpen}
        />
        <SiteSearchBar
          onSubmitSiteSearch={onSubmitSiteSearch}
          searchBarOpen={searchBarOpen}
        />
        <HeaderMenuButton />
      </div>
    </div>
  );
}

export default Header;
