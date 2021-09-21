/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - side bar outline item component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import { Link } from "gatsby";
import React from "react";

// App dependencies
import * as OutlineService from "../../utils/outline.service";

// Styles
import * as compStyles from "./side-bar-outline-item.module.css";

function SideBarOutlineItem(props) {
  const { activeOutline, outlineItem } = props;
  const outline = OutlineService.getOutline(outlineItem);
  const { anchor, depth, label } = outline;
  const indent = depth === 3;
  const active = anchor === activeOutline;
  const item = OutlineService.getOutlineItem(label, compStyles.ordered);
  const classNamesOutlineItem = classNames(
    { [compStyles.active]: active },
    { [compStyles.indent]: indent },
    compStyles.outlineItem
  );

  return (
    <li className={classNamesOutlineItem}>
      <Link to={anchor}>{item}</Link>
    </li>
  );
}

export default SideBarOutlineItem;
