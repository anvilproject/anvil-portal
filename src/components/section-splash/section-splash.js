/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - section splash component.
 * A wrapper component governing the "splash" style applied to the section introductions.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// Styles
import * as compStyles from "./section-splash.module.css";

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
