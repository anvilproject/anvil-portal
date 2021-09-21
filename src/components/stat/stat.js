/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - stat component.
 */

// Core dependencies
import React from "react";

// Styles
import * as compStyles from "./stat.module.css";

class Stat extends React.Component {
  render() {
    const { children, stat } = this.props;
    return (
      <div className={compStyles.stat}>
        <span className={compStyles.count}>{stat}</span>
        <span className={compStyles.label}>{children}</span>
      </div>
    );
  }
}

export default Stat;
