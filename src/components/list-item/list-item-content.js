/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Content displayed inside list item.
 */

// Core dependencies
import React from "react";

// App dependencies
import * as DOMService from "../../utils/dom.service";

// Styles
import compStyles from "./list-item-content.module.css";

class ListItemContent extends React.Component {

    /**
     * Prevent propagation on anchors within the list item content.
     */
    onClick = (e) => {

        if ( DOMService.isAnchor(e.target) ) {
            e.stopPropagation();
        }
    };

    render() {
        const {children} = this.props;
        return (
            <div className={compStyles.listItemContent} onClick={(e) => this.onClick(e)}>
                {children}
            </div>
        );
    }
}

export default ListItemContent;
