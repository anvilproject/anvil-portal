/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header nav bar component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./header-nav-bar.module.css";

interface HeaderNavBarProps {
  children: React.ReactElement;
}

function HeaderNavBar(props: HeaderNavBarProps): JSX.Element {
  const { children } = props;

  return <div className={compStyles.headerNavBar}>{children}</div>;
}

export default HeaderNavBar;
