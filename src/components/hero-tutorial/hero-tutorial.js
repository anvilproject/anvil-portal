/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - hero tutorial component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Breadcrumb from "../breadcrumb/breadcrumb";

// Styles
import compStyles from "./hero-tutorial.module.css";

function HeroTutorial(props) {

    const {children} = props;

    return (
        <div className={compStyles.hero}>
            <Breadcrumb/>
            {children}
        </div>
    );
}

export default HeroTutorial;
