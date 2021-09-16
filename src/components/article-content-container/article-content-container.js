/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article content container component.
 * Provides container styles to the article content.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// Styles
import * as compStyles from "../article-content-container/article-content-container.module.css";

function ArticleContentContainer(props) {
  const { children, left } = props;
  const classNamesContentContainer = classNames(compStyles.contentContainer, {
    [compStyles.left]: left,
  });

  return <div className={classNamesContentContainer}>{children}</div>;
}

export default ArticleContentContainer;
