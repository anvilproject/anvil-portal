/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - section body component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./section-body.module.css";
import globalStyles from "../../styles/global.module.css";

let classNames = require("classnames");

class SectionBody extends React.Component {
  render() {
    const { children, className } = this.props;
    return (
      <div className={classNames(compStyles.sectionBody, className)}>
        <div
          className={classNames(
            globalStyles.grid,
            globalStyles.g750,
            compStyles.container
          )}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default SectionBody;
