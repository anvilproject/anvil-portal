/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * List item component, used when displaying either news or event items in a list. Handles both internal and external
 * links. For internal links, only linkTo (path) prop is defined. For external links, redirectTo action as well as a
 * label for the link must be defined. (Label is required for accessibility.)
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// App dependencies
import ClickHandler from "../click-handler/click-handler";

// Styles
import * as compStyles from "./list-item.module.css";

class ListItem extends React.Component {
  render() {
    const { children, label, linkTo, redirectTo } = this.props;
    return (
      <div className={compStyles.listItem}>
        {linkTo ? <Link to={linkTo}>{children}</Link> : null}
        {redirectTo ? (
          <ClickHandler clickAction={redirectTo} tag="span" label={label}>
            {children}
          </ClickHandler>
        ) : null}
      </div>
    );
  }
}

export default ListItem;
