/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site wrapper component; wraps main body content.
 * Handles site scrolling and mimics "body" styles (stretches content to facilitate footer positioning).
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextAnVILPortal from "../context-anvil-portal/context-anvil-portal";

// Styles
import compStyles from "./site-wrapper.module.css";

const classNames = require("classnames");

const SiteWrapper = React.forwardRef((props, ref) => {
  const { children } = props;
  const { siteScrollable } = useContext(ContextAnVILPortal);

  return (
    <div
      className={classNames(compStyles.site, {
        [compStyles.noScroll]: !siteScrollable,
      })}
      ref={ref}
    >
      {children}
    </div>
  );
});

export default SiteWrapper;
