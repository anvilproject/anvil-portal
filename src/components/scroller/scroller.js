/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL scroller component.
 * Provides scrolling styles to nav, outline and side bar components.
 */

// Core dependencies
import React, { useCallback, useEffect, useState } from "react";

// App dependencies
import * as ScrollingService from "../../utils/scrolling.service";

function Scroller(props) {
  const { articleOffsetTop, bannerHeight, children } = props;
  const [containerStyles, setContainerStyles] = useState({
    maxHeight: `unset`,
    top: `unset`
  });
  const { maxHeight, top } = containerStyles || {};

  const updateContainerStyles = useCallback(() => {
    /* Sets the container maxHeight and top position. */
    const styles = ScrollingService.calculateContainerStyles(
      bannerHeight,
      articleOffsetTop
    );
    setContainerStyles(containerStyles => ({
      ...containerStyles,
      maxHeight: styles.maxHeight,
      top: styles.top
    }));
  }, [articleOffsetTop, bannerHeight]);

  /* useEffect - componentDidMount, componentWillUnmount. */
  useEffect(() => {
    /* Initialize container style. */
    updateContainerStyles();

    /* Add event listeners "scroll" and "resize". */
    window.addEventListener("scroll", updateContainerStyles);
    window.addEventListener("resize", updateContainerStyles);

    return () => {
      /* Remove event listeners. */
      window.removeEventListener("scroll", updateContainerStyles);
      window.removeEventListener("resize", updateContainerStyles);
    };
  }, [updateContainerStyles]);

  /* useEffect - componentDidUpdate - bannerHeight, articleOffsetTop. */
  useEffect(() => {
    updateContainerStyles();
  }, [updateContainerStyles]);

  return React.Children.map(children, child =>
    React.cloneElement(child, { style: { maxHeight: maxHeight, top: top } })
  );
}

export default Scroller;
