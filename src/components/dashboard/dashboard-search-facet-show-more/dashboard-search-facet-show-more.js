/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search facet show more component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// App dependencies
import Button from "../../button/button";

// Styles
import {
  grid,
  more as moreStyles,
} from "./dashboard-search-facet-show-more.module.css";

function DashboardSearchFacetShowMore(props) {
  const { moreCount, onShowMore, toggleSelect } = props;
  const buttonText = `+ ${moreCount} more`;

  return (
    <Button clickAction={() => onShowMore()}>
      <span
        className={classNames(moreStyles, {
          [grid]: toggleSelect,
        })}
      >
        {buttonText}
      </span>
    </Button>
  );
}

export default DashboardSearchFacetShowMore;
