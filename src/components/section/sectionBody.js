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

class SectionBody extends React.Component {

    render() {
        const {children, shade, top} = this.props;
        return (
            <div className={compStyles.sectionBody} style={{backgroundColor: shade, marginTop: top}}>
                <div className={compStyles.container}>
                    {children}
                </div>
            </div>
        );
    }
}

export default SectionBody;
