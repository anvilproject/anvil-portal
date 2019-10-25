/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - button component.
 * Use of this component within markdown is possible.
 * Use the tag <button>my link</button> but ensure it is closed.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./button.module.css";

let classNames = require("classnames");

class Button extends React.Component {

    render() {
        const {children, dark} = this.props,
            darkButton = (dark === "") || dark === true;
        return (
            <button className={classNames(compStyles.button, {[compStyles.dark]: darkButton})}>
                {children}
            </button>
        );
    }
}

export default Button;
