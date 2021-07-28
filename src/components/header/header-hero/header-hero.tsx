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

const classNames = require("classnames");

interface HeaderHeroProps {
  children: React.ReactElement[];
  searchBarOpen: boolean;
}

function HeaderHero(props: HeaderHeroProps): JSX.Element {
  const { children, searchBarOpen } = props;
  const classNamesHero = classNames(compStyles.headerHero, {
    [compStyles.hide]: searchBarOpen,
  });

  return <div className={classNamesHero}>{children}</div>;
}

export default HeaderHero;
