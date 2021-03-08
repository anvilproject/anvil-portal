/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - modal close component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Button from "../../button/button";
import Icon from "../../icon/icon";

function ModalClose(props) {

    const {onCloseModal} = props;

    return (
        <Button clickAction={() => onCloseModal()} icon>
            <Icon showHover={true} showIcon={true}>close</Icon>
        </Button>
    )
}

export default ModalClose;
