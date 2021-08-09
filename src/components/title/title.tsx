/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - title component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextSiteSearch from "../site-search/context-site-search/context-site-search";

// Styles
import compStyles from "./title.module.css";

interface TitleProps {
  subTitle: string;
  title: string;
}

function Title(props: TitleProps) {
  const { subTitle, title } = props;
  const { siteSearch } = useContext(ContextSiteSearch);
  const { searchTerms } = siteSearch || {};
  const showSubTitle = subTitle && !searchTerms;

  return (
    <h1 className={compStyles.title}>
      <span>
        <span>{title}</span>
        {showSubTitle && (
          <span className={compStyles.subTitle}> &gt; {subTitle}</span>
        )}
      </span>
      {searchTerms ? <span> for &quot;{searchTerms || null}&quot;</span> : null}
    </h1>
  );
}

export default Title;
