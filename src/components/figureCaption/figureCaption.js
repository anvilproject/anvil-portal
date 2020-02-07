/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - figure caption component.
 * Use of this component within markdown is possible.
 * Use the tag <figcaption>my figure caption</figcaption> but ensure it is closed.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./figureCaption.module.css";

class FigureCaption extends React.Component {

    render() {
        const {children} = this.props;
        return (
            <p className={compStyles.figCaption}>
                {children}
            </p>
        );
    }
}

export default FigureCaption;
