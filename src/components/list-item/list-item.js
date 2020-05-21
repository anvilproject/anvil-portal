/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * List item component, used when displaying either news or event items in a list.
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// Styles
import compStyles from "./list-item.module.css";

class ListItem extends React.Component {

    render() {
        const {children, linkTo} = this.props;
        return (
            <div className={compStyles.listItem}>
                <Link to={linkTo}>
                    {children}
                </Link>
            </div>
        );
    }
}

export default ListItem;
