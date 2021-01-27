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

    const {nextPage, previousPage, setGCSEParams, setGCSEResponse, startIndex} = props || {};

    return (
        <div className={compStyles.pagination}>
            <SiteSearchPaginationButton icon={"arrow_back_ios"}
                                        setGCSEParams={setGCSEParams}
                                        setGCSEResponse={setGCSEResponse}
                                        showMore={previousPage}
                                        sign={-1}
                                        startIndex={startIndex}/>
            <SiteSearchPaginationButton icon={"arrow_forward_ios"}
                                        setGCSEParams={setGCSEParams}
                                        setGCSEResponse={setGCSEResponse}
                                        showMore={nextPage}
                                        sign={1}
                                        startIndex={startIndex}/>
        </div>
    )
}

export default SiteSearchPagination;
