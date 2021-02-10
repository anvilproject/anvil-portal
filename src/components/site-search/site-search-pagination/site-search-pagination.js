/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search pagination component.
 */

// Core dependencies
import React from "react";

// App dependencies
import SiteSearchPaginationButton from "../site-search-pagination-button/site-search-pagination-button";

// Styles
import compStyles from "./site-search-pagination.module.css";

function SiteSearchPagination(props) {

    const {onSiteSearchPageRequest, nextPage, previousPage} = props;

    return (
        <div className={compStyles.pagination}>
            <SiteSearchPaginationButton icon={"arrow_back_ios"}
                                        onSiteSearchPageRequest={onSiteSearchPageRequest}
                                        showMore={previousPage}
                                        sign={-1}/>
            <SiteSearchPaginationButton icon={"arrow_forward_ios"}
                                        onSiteSearchPageRequest={onSiteSearchPageRequest}
                                        showMore={nextPage}
                                        sign={1}/>
        </div>
    )
}

export default React.memo(SiteSearchPagination);
