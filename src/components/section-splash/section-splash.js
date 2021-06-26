/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - section splash component.
 * A wrapper component governing the "splash" style applied to the section introductions.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./section-splash.module.css";

let classNames = require("classnames");

class SectionSplash extends React.Component {
  render() {
    const { children, end, start, stretch } = this.props;

    return (
      <div
        className={classNames(
          { [compStyles.end]: end },
          compStyles.splash,
          { [compStyles.start]: start },
          { [compStyles.stretch]: stretch }
        )}
      >
        {children}
      </div>
    );
  }
}

export default SectionSplash;
