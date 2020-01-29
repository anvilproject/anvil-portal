/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - link with arrow component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./goArrow.module.css";

class GoArrow extends React.Component {

    render() {
        const {children} = this.props;
        return (
            <span className={compStyles.linkTo}>{children}</span>
        );
    }
}

export default GoArrow;
