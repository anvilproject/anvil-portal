/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search checkboxes show more component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Button from "../../button/button";

// Styles
import compStyles from "./dashboard-search-checkboxes-show-more.module.css";

function DashboardSearchCheckboxesShowMore(props) {
  const { moreCount, onShowMore } = props;
  const more = moreCount > 0;
  const buttonText = `+ ${moreCount} more`;

  return more ? (
    <Button clickAction={() => onShowMore()}>
      <span className={compStyles.more}>{buttonText}</span>
    </Button>
  ) : null;
}

export default DashboardSearchCheckboxesShowMore;
