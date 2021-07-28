/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header nav side bar hero component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./header-nav-side-bar-hero.module.css";

interface HeaderNavSideBarHeroProps {
  children: React.ReactElement;
}

function HeaderNavSideBarHero(props: HeaderNavSideBarHeroProps): JSX.Element {
  const { children } = props;

  return <div className={compStyles.sideBarHero}>{children}</div>;
}

export default HeaderNavSideBarHero;
