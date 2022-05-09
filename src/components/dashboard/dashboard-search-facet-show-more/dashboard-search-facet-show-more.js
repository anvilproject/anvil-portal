/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search facet show more component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Button from "../../button/button";

// Styles
import { more as moreStyles } from "./dashboard-search-facet-show-more.module.css";

function DashboardSearchFacetShowMore(props) {
  const { moreCount, onShowMore } = props;
  const more = moreCount > 0;
  const buttonText = `+ ${moreCount} more`;

  return more ? (
    <Button clickAction={() => onShowMore()}>
      <span className={moreStyles}>{buttonText}</span>
    </Button>
  ) : null;
}

export default DashboardSearchFacetShowMore;
