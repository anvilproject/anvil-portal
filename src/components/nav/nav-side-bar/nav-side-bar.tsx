/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav side bar component.
 */

// Core dependencies
import React, { useCallback, useEffect, useState } from "react";

// App dependencies
import * as ScrollingService from "../../../utils/scrolling.service";

// Styles
import compStyles from "./nav-side-bar.module.css";

interface NavSideBarProps {
  articleOffsetTop: number;
  bannerHeight: number;
  children: React.ReactElement;
}

function NavSideBar(props: NavSideBarProps): JSX.Element {
  const { articleOffsetTop, bannerHeight, children } = props;
  const [navStyles, setNavStyles] = useState({
    maxHeight: "unset",
    top: "unset",
  });
  const { maxHeight, top } = navStyles || {};

  const updateNavStyles = useCallback(() => {
    /* Sets the nav container maxHeight and top position. */
    const styles = ScrollingService.calculateContainerStyles(
      bannerHeight,
      articleOffsetTop
    );

    setNavStyles((currentNavStyles) => ({
      ...currentNavStyles,
      maxHeight: styles.maxHeight,
      top: styles.top,
    }));
  }, [articleOffsetTop, bannerHeight]);

  /* useEffect - componentDidMount, componentWillUnmount. */
  useEffect(() => {
    /* Initialize nav style. */
    updateNavStyles();

    /* Add event listeners "scroll" and "resize". */
    window.addEventListener("scroll", updateNavStyles);
    window.addEventListener("resize", updateNavStyles);

    return () => {
      /* Remove event listeners. */
      window.removeEventListener("scroll", updateNavStyles);
      window.removeEventListener("resize", updateNavStyles);
    };
  }, [updateNavStyles]);

  /* useEffect - componentDidUpdate - bannerHeight, articleOffsetTop. */
  useEffect(() => {
    updateNavStyles();
  }, [updateNavStyles]);

  return (
    <div className={compStyles.navSideBarContainer}>
      <div className={compStyles.navSideBar} style={{ maxHeight, top }}>
        {children}
      </div>
    </div>
  );
}

export default NavSideBar;
