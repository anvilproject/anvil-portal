/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search checkboxes show more component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import Button from "../../button/button";
import ContextModal from "../../modal/context-modal/context-modal";

// Styles
import compStyles from "./dashboard-search-checkboxes-show-more.module.css";

function DashboardSearchCheckboxesShowMore(props) {

    const {groupName, moreCount} = props;
    const {onOpenModal} = useContext(ContextModal);
    const more = moreCount > 0;
    const buttonText = `+ ${moreCount} more`;

    const onShowMore = () => {

        onOpenModal(groupName);
    };

    return (
        more ?
        <Button clickAction={() => onShowMore()}>
            <span className={compStyles.more}>
                {buttonText}
            </span>
        </Button> : null
    );
}

export default DashboardSearchCheckboxesShowMore;
