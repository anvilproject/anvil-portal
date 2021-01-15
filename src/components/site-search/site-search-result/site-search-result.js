/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search result component.
 */

// Core dependencies
import React from "react";

// Images
import searchPlaceholder from "../../../../images/search-placeholder.png";

// Styles
import compStyles from "./site-search-result.module.css";

function SiteSearchResult(props) {

    const {result} = props,
        {link, formattedUrl, pagemap, snippet, title} = result,
        {cse_thumbnail} = pagemap || {};
    const firstThumbnail = cse_thumbnail ? cse_thumbnail[0] : null;
    const imgSrc = firstThumbnail ? firstThumbnail.src : searchPlaceholder;

    return (
        <div className={compStyles.snippet}>
            <img src={imgSrc} alt={"Search Result"}/>
            <span>
                <h4><a href={link} rel={"noopener noreferrer"}>{title}</a></h4>
                <p className={compStyles.url}>{formattedUrl}</p>
                <p>{snippet}</p>
            </span>
        </div>
    )
}

export default SiteSearchResult;
