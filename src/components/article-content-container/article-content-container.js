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
import compStyles from "../article-content-container/article-content-container.module.css";

const classNames = require("classnames");

function ArticleContentContainer(props) {
  const { children, left } = props;
  const classNamesContentContainer = classNames(compStyles.contentContainer, {
    [compStyles.left]: left,
  });

  return <div className={classNamesContentContainer}>{children}</div>;
}

export default ArticleContentContainer;
