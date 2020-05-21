/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Content displayed inside list item.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./list-item-content.module.css";

class ListItemContent extends React.Component {

    render() {
        const {children} = this.props;
        return (
            <div className={compStyles.listItemContent}>
                {children}
            </div>
        );
    }
}

export default ListItemContent;
