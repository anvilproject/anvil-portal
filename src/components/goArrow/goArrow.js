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

let classNames = require("classnames");

class GoArrow extends React.Component {

    render() {
        const {children, className} = this.props;
        return (
            <span className={classNames(compStyles.linkTo, className)}>{children}</span>
        );
    }
}

export default GoArrow;
