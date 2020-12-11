/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - logo font component. Displays text in logo font typography.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./logo-font.module.css";

function LogoFont(props) {

    const {children} = props;

    return (
        <span className={compStyles.logoFont}>{children}</span>
    );
}

export default LogoFont;
