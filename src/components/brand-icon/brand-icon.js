/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * This component displays a tool, workspace or platform icon within a list.
 */

// Core dependencies
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

// Styles
import * as compStyles from "./brand-icon.module.css";

class BrandIcon extends React.Component {
  render() {
    const { brand, alt } = this.props;
    return (
      <div className={compStyles.brandIcon}>
        <GatsbyImage
          alt={alt}
          className={compStyles.brandIconImage}
          image={getImage(brand)}
        />
      </div>
    );
  }
}

export default BrandIcon;
