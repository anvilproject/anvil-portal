/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header hero component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./header-hero.module.css";

interface HeaderHeroProps {
  children: React.ReactElement[];
}

function HeaderHero(props: HeaderHeroProps): JSX.Element {
  const { children } = props;

  return <div className={compStyles.headerHero}>{children}</div>;
}

export default HeaderHero;
