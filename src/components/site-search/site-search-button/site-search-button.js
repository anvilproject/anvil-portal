/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search button component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import Button from "../../button/button";
import Icon from "../../icon/icon";
import ContextModal from "../../modal/context-modal/context-modal";
import {ModalAction} from "../../../utils/modal/modal-action.model";

function SiteSearchButton() {

    const {onOpenModal} = useContext(ContextModal);

    return (
        <Button clickAction={() => {onOpenModal(ModalAction.SHOW_SITE_SEARCH)}} icon>
            <Icon blueDark showHover={false} showIcon={true}>search</Icon>
        </Button>
    )
}

export default SiteSearchButton;
