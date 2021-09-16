/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav drawer hero component.
 */

// Core dependencies
import React from "react";

// Styles
import * as compStyles from "./nav-drawer-hero.module.css";

interface NavDrawerHeroProps {
  subTitle: string;
  title: string;
}

function NavDrawerHero(props: NavDrawerHeroProps): JSX.Element {
  const { subTitle, title } = props;

  return (
    <div className={compStyles.navDrawerHero}>
      <span>Also in</span>
      <span> {title}</span>
      {subTitle ? <span> &gt; {subTitle}</span> : null}
    </div>
  );
}

export default NavDrawerHero;
