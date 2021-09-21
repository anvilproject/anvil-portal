/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL click handler component.
 * Available for use by non-interactive elements with click handlers.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// Styles
import * as compStyles from "./click-handler.module.css";

class ClickHandler extends React.Component {
  handleKeyDown = (e, clickAction) => {
    if (e.key === "Enter" || e.key === " ") {
      clickAction();
    }
  };

  render() {
    const {
      children,
      className,
      clickAction,
      id,
      label,
      tag: Tag,
    } = this.props;

    return (
      <Tag
        id={id}
        className={classNames(className, compStyles.handler)}
        onClick={clickAction}
        onKeyDown={(e) => this.handleKeyDown(e, clickAction)}
        aria-label={label}
      >
        {children}
      </Tag>
    );
  }
}

export default ClickHandler;
