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
import NavDrawer from "./nav-drawer/nav-drawer";
import NavDrawerHero from "./nav-drawer-hero/nav-drawer-hero";
import { INavigation } from "../navigation/navigation";
import NavList from "./nav-items/nav-items";
import NavSideBar from "./nav-side-bar/nav-side-bar";

interface NavProps {
  articleOffsetTop: number;
  bannerHeight: number;
  docPath: string;
  navigation: INavigation;
}

function Nav(props: NavProps): JSX.Element | null {
  const { articleOffsetTop, bannerHeight, docPath, navigation } = props;
  const { onSetShowNavDrawerButton } = useContext(ContextAnVILPortal);
  const { navItems, tabs, title } = navigation || {};
  const showNav = navItems && navItems.length > 0;
  const subTitle = tabs?.find((tab) => tab.active)?.name || "";

  useEffect(() => {
    onSetShowNavDrawerButton(showNav);
  }, [showNav]);

  return showNav ? (
    <>
      <NavDrawer>
        <NavDrawerHero subTitle={subTitle} title={title} />
        <NavList docPath={docPath} navItems={navItems} />
      </NavDrawer>
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
