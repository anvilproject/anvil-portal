/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - section body component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./sectionBody.module.css";

let classNames = require("classnames");

class SectionBody extends React.Component {

    render() {
        const {children, className} = this.props;
        return (
            <div className={classNames(compStyles.sectionBody, className)}>
                <div className={compStyles.container}>
                    {children}
                </div>
            </div>
        );
    }
}

export default SectionBody;
