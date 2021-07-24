/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - side bar component.
 */

// Core dependencies
import React from "react";

// App dependencies
import SideBarOutline from "../side-bar-outline/side-bar-outline";

// Styles
import compStyles from "./side-bar.module.css";

interface SideBarProps{
    activeOutline: boolean,
    articleOffsetTop: number,
    bannerHeight: number,
    docPath: string
}

function SideBar(props: SideBarProps) {
  const { activeOutline, articleOffsetTop, bannerHeight, docPath } = props;

  return (
    <div className={compStyles.sideBar}>
      <SideBarOutline
        activeOutline={activeOutline}
        articleOffsetTop={articleOffsetTop}
        bannerHeight={bannerHeight}
        docPath={docPath}
      />
    </div>
  );
}

export default SideBar;
