/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search pagination button component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Button from "../../button/button";
import Icon from "../../icon/icon";

function SiteSearchPaginationButton(props) {

    const {children, setGCSEParams, showMore, sign, startIndex} = props;
    const morePages = !!showMore;

    const onHandlePageRequest = () => {

        const nextIndex = startIndex + (sign*10);

        setGCSEParams(GCSEParams => ({...GCSEParams, start: nextIndex}));
    };

    return (
        <Button clickAction={() => onHandlePageRequest()} disabled={!morePages}>
            <Icon showHover={true} showIcon={true}>{children}</Icon>
        </Button>
    )
}

export default SiteSearchPaginationButton;
