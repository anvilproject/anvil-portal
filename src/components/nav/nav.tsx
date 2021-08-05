/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav component.
 */

// Core dependencies
import React, { useContext, useEffect } from "react";

// App dependencies
import ContextAnVILPortal from "../context-anvil-portal/context-anvil-portal";
import HeaderLogo from "../header/header-logo/header-logo";
import Headline from "../headline/headline";
import { INavigation } from "../navigation/navigation";
import NavList from "./nav-items/nav-items";
import NavMenu from "./nav-menu/nav-menu";
import NavMenuHero from "./nav-menu-hero/nav-menu-hero";
import NavSideBar from "./nav-side-bar/nav-side-bar";

interface NavProps {
  articleOffsetTop: number;
  bannerHeight: number;
  docPath: string;
  navigation: INavigation;
  ncpi: boolean;
}

function Nav(props: NavProps) {
  const { articleOffsetTop, bannerHeight, docPath, navigation, ncpi } = props;
  const { onSetShowNavMenuButton } = useContext(ContextAnVILPortal);
  const { navItems, tabs, title } = navigation || {};
  const showNav = navItems && navItems.length > 0;

  useEffect(() => {
    onSetShowNavMenuButton(showNav);
  }, [showNav]);

  return showNav ? (
    <>
      <NavMenu>
        <NavMenuHero>
          <HeaderLogo ncpi={ncpi} />
        </NavMenuHero>
        <Headline tabs={tabs} title={title} />
        <NavList docPath={docPath} navItems={navItems} />
      </NavMenu>
      <NavSideBar
        articleOffsetTop={articleOffsetTop}
        bannerHeight={bannerHeight}
      >
        <NavList docPath={docPath} navItems={navItems} />
      </NavSideBar>
    </>
  ) : null;
}

export default Nav;
