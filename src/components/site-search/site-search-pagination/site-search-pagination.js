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

function SiteSearchPagination(props) {

    const {nextPage, previousPage, setGCSEParams, startIndex} = props || {};

    return (
        <>
        <SiteSearchPaginationButton setGCSEParams={setGCSEParams}
                                    showMore={previousPage}
                                    sign={-1}
                                    startIndex={startIndex}>arrow_back_ios</SiteSearchPaginationButton>
        <SiteSearchPaginationButton setGCSEParams={setGCSEParams}
                                    showMore={nextPage}
                                    sign={1}
                                    startIndex={startIndex}>arrow_forward_ios</SiteSearchPaginationButton>
        </>
    )
}

export default SiteSearchPagination;
