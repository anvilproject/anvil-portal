/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL footer component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./footer.module.css";

class Footer extends React.Component {

    render() {
        return (
            <div className={compStyles.footer}/>
        );
    }
}

export default () => {
    return (
        <Footer/>
    )
}
