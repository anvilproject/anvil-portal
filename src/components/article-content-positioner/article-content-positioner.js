/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article content positioner component.
 * Provides positioning to the article content.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// Styles
import * as compStyles from "../article-content-positioner/article-content-positioner.module.css";

function ArticleContentPositioner(props) {
  const { children, left } = props;
  const classNamesContentPositioner = classNames(compStyles.contentPositioner, {
    [compStyles.left]: left,
  });

  return <div className={classNamesContentPositioner}>{children}</div>;
}

export default ArticleContentPositioner;
