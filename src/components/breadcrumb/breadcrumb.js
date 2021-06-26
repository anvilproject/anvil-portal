/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - breadcrumb component.
 */

// Core dependencies
import { Link } from "gatsby";
import React, { useContext } from "react";

// App dependencies
import ContextFrontmatter from "../context-frontmatter/context-frontmatter";
import Icon from "../icon/icon";

// Styles
import compStyles from "./breadcrumb.module.css";

function Breadcrumb() {
  const { breadcrumb } = useContext(ContextFrontmatter),
    { link } = breadcrumb,
    { name } = breadcrumb || "Back";

  return link ? (
    <Link className={compStyles.breadcrumb} to={link}>
      <Icon breadcrumb fontSize={20} showIcon>
        arrow_back
      </Icon>
      <span className={compStyles.breadcrumbLabel}>{name}</span>
    </Link>
  ) : null;
}

export default Breadcrumb;
