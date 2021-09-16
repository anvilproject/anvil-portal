/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - section body component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// Styles
import * as compStyles from "./section-body.module.css";
import * as globalStyles from "../../styles/global.module.css";

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
