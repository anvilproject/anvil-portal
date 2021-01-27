/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search pagination button component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Arrow from "../../arrow/arrow";
import Button from "../../button/button";

function SiteSearchPaginationButton(props) {

    const {icon, setGCSEParams, setGCSEResponse, showMore, sign, startIndex} = props;
    const next = icon === "arrow_forward_ios";
    const previous = icon === "arrow_back_ios";
    const label = next ? "Next" : previous ? "Previous" : "";
    const morePages = (!!showMore && next) || (!!showMore && previous);

    const onHandlePageRequest = () => {

        const nextIndex = startIndex + (sign*10);

        setGCSEResponse(GCSEResponse => ({...GCSEResponse, GCSEMounted: false}));
        setGCSEParams(GCSEParams => ({...GCSEParams, start: nextIndex}));
    };

    return (
        morePages ?
            <Button clickAction={() => onHandlePageRequest()}>
                <Arrow reverse={previous}>
                    <span>{label}</span>
                </Arrow>
            </Button> : null
    )
}

export default SiteSearchPaginationButton;
