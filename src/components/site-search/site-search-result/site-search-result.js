/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search result component.
 *
 * Props
 * *****
 * - results: the set of search results matching the entered search text
 * - query: the entered search text, required for tracking of click on search results
 */

// Core dependencies
import React from "react";

// App dependencies
import * as AnvilGTMService from "../../../utils/anvil-gtm/anvil-gtm.service";

// Images
import searchPlaceholder from "../../../../images/search-placeholder.png";

// Styles
import compStyles from "./site-search-result.module.css";

function SiteSearchResult(props) {
  const { result, query } = props,
    { link, formattedUrl, pagemap, snippet, title } = result,
    { cse_thumbnail } = pagemap || {};
  const firstThumbnail = cse_thumbnail ? cse_thumbnail[0] : null;
  const imgSrc = firstThumbnail ? firstThumbnail.src : searchPlaceholder;

  /**
   * Track click on search result.
   */
  const onSearchResultClicked = (resultTitle, resultUrl, query) => {
    AnvilGTMService.trackSiteSearchResultClicked(resultTitle, resultUrl, query);
  };

  return (
    <div className={compStyles.snippet}>
      <img src={imgSrc} alt={"Search Result"} />
      <span>
        <a
          href={link}
          rel="noopener"
          onClick={() => onSearchResultClicked(title, formattedUrl, query)}
        >
          <h4>{title}</h4>
          <p className={compStyles.url}>{formattedUrl}</p>
        </a>
        <p>{snippet}</p>
      </span>
    </div>
  );
}

export default SiteSearchResult;
