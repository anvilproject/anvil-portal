/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Icon displayed inside list item.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./list-item-icon.module.css";

class ListItemIcon extends React.Component {
  render() {
    const { children } = this.props;
    return <div className={compStyles.listItemIcon}>{children}</div>;
  }
}

export default ListItemIcon;
