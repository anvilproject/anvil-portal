/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - button component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./button.module.css";

let classNames = require("classnames");

function Button(props) {

    const {children, clickAction, dark} = props;
    const darkButton = (dark === "") || dark === true;

    const onHandleClickAction = () => {

        if ( clickAction ) {

            clickAction();
        }
    };

    return (
        <button className={classNames(compStyles.button, {[compStyles.dark]: darkButton})}
                onClick={() => onHandleClickAction()}>
            {children}
        </button>
    );
}

export default Button;
