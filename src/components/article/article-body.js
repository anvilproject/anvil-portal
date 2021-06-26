/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article body component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextSiteSearch from "../site-search/context-site-search/context-site-search";
import Markdown from "../markdown/markdown";

// Styles
import compStyles from "./article-body.module.css";

function ArticleBody(props) {
  const { children, className, htmlAst } = props;
  const { siteSearch } = useContext(ContextSiteSearch),
    { searchLoading } = siteSearch || {};

  return (
    <div className={compStyles.articleBody}>
      <Markdown className={className}>{htmlAst}</Markdown>
      {searchLoading ? null : children}
    </div>
  );
}

export default ArticleBody;
