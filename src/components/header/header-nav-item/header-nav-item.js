/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header nav item component.
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// Styles
import compStyles from "./header-nav-item.module.css";

function HeaderNavItem(props) {
  const { header, partiallyActive } = props,
    { name, path } = header;

  return (
    <li className={compStyles.headerNavItem}>
      <Link
        activeClassName={compStyles.active}
        partiallyActive={partiallyActive}
        to={path}
      >
        {name}
      </Link>
    </li>
  );
}

export default HeaderNavItem;
