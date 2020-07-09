/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * This component displays a tool, workspace or platform icon within a list. 
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./brand-icon.module.css";

class BrandIcon extends React.Component {

    render() {
        const {src, alt} = this.props;
        return (
            <div className={compStyles.brandIcon}>
                <img className={compStyles.brandIconImage} src={src} alt={alt}/>
            </div>
        );
    }
}

export default BrandIcon;
