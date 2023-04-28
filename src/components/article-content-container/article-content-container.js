/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article content container component.
 * Provides container styles to the article content.
 */

// Core dependencies
import React from "react";

// Styles
import * as compStyles from "../article-content-container/article-content-container.module.css";

function ArticleContentContainer(props) {
  const { children } = props;
  return <div className={compStyles.contentContainer}>{children}</div>;
}

export default ArticleContentContainer;
