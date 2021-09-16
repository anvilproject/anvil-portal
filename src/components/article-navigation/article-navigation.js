/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL article navigation component.
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// App dependencies
import Arrow from "../arrow/arrow";

// Styles
import * as compStyles from "./article-navigation.module.css";

function ArticleNavigation(props) {
  const { navigation } = props,
    { navItemNext, navItemPrevious } = navigation || {};
  const showArticleNavigation = navItemNext || navItemPrevious;

  return showArticleNavigation ? (
    <div className={compStyles.articleNavigation}>
      {navItemPrevious ? (
        <Arrow reverse>
          <Link to={navItemPrevious.path} className={compStyles.prev}>
            {navItemPrevious.name}
          </Link>
        </Arrow>
      ) : null}
      {navItemNext ? (
        <Arrow>
          <Link to={navItemNext.path} className={compStyles.next}>
            {navItemNext.name}
          </Link>
        </Arrow>
      ) : null}
    </div>
  ) : null;
}

export default ArticleNavigation;
