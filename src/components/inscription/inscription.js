/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - inscription component.
 * Use of this component within markdown is possible.
 * Use the tag <inscription>my caption</inscription> but ensure it is closed.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./inscription.module.css";

class Inscription extends React.Component {

    render() {
        const {children} = this.props;
        return (
            <div className={compStyles.inscription}>
                {children}
            </div>
        );
    }
}

export default Inscription;
