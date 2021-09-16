/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search progress indicator component.
 */

// Core dependencies
import React from "react";

// Styles
import * as compStyles from "./site-search-progress-indicator.module.css";

function SiteSearchProgressIndicator() {
  return (
    <div className={compStyles.progressIndicator}>
      <span />
      <span />
      <span />
    </div>
  );
}

export default React.memo(SiteSearchProgressIndicator);
