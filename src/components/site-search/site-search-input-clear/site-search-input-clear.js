/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - site search bar clear component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Button from "../../button/button";
import Icon from "../../icon/icon";

function SiteSearchInputClear(props) {

    const {onInputClear} = props;

    return (
        <Button clickAction={() => onInputClear()} icon>
            <Icon fontSize={20} showHover={true} showIcon={true}>close</Icon>
        </Button>
    )
}

export default SiteSearchInputClear;

