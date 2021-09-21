/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - more component.
 */

// Core dependencies
import React from "react";

// Styles
import * as compStyles from "./more.module.css";

interface MoreProps {
  setTruncateText: (truncateText: boolean) => void;
  truncateText: boolean;
}

function More(props: MoreProps): JSX.Element {
  const { setTruncateText, truncateText } = props;
  const moreText = truncateText ? "Show more" : "Show less";

  return (
    <span
      className={compStyles.more}
      onClick={() => setTruncateText(!truncateText)}
      role="presentation"
    >
      {moreText}
    </span>
  );
}

export default More;
