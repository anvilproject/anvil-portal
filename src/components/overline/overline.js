/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * This component applies an "overline" style to all children, and children are delimited with bubble.
 */

// Core dependencies
import React from "react";

// Styles
import * as compStyles from "./overline.module.css";

class Overline extends React.Component {
  render() {
    const { children } = this.props;
    return <div className={compStyles.overline}>{children}</div>;
  }
}

export default Overline;
