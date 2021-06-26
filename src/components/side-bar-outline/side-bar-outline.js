/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - side bar outline component.
 */

// Core dependencies
import React from "react";

// App dependencies
import { OutlineStaticQuery } from "../../hooks/outline-query";
import Scroller from "../scroller/scroller";
import SideBarOutlineItem from "../side-bar-outline-item/side-bar-outline-item";
import * as OutlineService from "../../utils/outline.service";

// Styles
import compStyles from "./side-bar-outline.module.css";

function SideBarOutline(props) {
  const { activeOutline, articleOffsetTop, bannerHeight, docPath } = props;
  const outlines = OutlineService.filterHtmlAstByHeading(
    OutlineStaticQuery(),
    docPath
  );

  return outlines ? (
    <Scroller articleOffsetTop={articleOffsetTop} bannerHeight={bannerHeight}>
      <div className={compStyles.outline}>
        <div className={compStyles.outlineLabel}>In this guide</div>
        <ul className={compStyles.outlineList}>
          {outlines.map((outlineItem, o) => (
            <SideBarOutlineItem
              key={o}
              activeOutline={activeOutline}
              outlineItem={outlineItem}
            />
          ))}
        </ul>
      </div>
    </Scroller>
  ) : null;
}

export default SideBarOutline;
