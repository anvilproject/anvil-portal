/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - hero component.
 * Use of this component within markdown is possible.
 * Use the tag <hero>hero text</hero> but ensure it is closed.
 * An additional variable may be used to reduce the font size. Use the tag <hero small>hero text</hero>.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./hero.module.css";

let classNames = require("classnames");

class Hero extends React.Component {

    isCompStyles = (styleName) => {

        return (styleName === "") || (styleName === true);
    };

    render() {
        const {children, small} = this.props;
        return (
            <p className={classNames(compStyles.hero, {[compStyles.small]: this.isCompStyles(small)})}>
                {children}
            </p>
        );
    }
}

export default Hero;
