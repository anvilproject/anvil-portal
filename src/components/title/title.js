/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - title component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./title.module.css";

function Title(props) {

    const {title} = props;

    return (
        <h1 className={compStyles.title}>{title}</h1>
    );
}

export default Title;
