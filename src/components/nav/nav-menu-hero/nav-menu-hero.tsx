/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav menu hero component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./nav-menu-hero.module.css";

interface NavMenuHeroProps {
  children: React.ReactElement;
}

function NavMenuHero(props: NavMenuHeroProps): JSX.Element {
  const { children } = props;

  return <div className={compStyles.navMenuHero}>{children}</div>;
}

export default NavMenuHero;
