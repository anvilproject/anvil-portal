/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL click handler component.
 * Available for use by non-interactive elements with click handlers.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./click-handler.module.css";

let classNames = require("classnames");

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
