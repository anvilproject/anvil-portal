/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article content positioner component.
 * Provides positioning to the article content.
 */

// Core dependencies
import React from "react";

// Styles
import * as compStyles from "../article-content-positioner/article-content-positioner.module.css";

function ArticleContentPositioner(props) {
  const { children } = props;
  return <div className={compStyles.contentPositioner}>{children}</div>;
}

export default ArticleContentPositioner;
