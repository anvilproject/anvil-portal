/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard study overview component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React, { useEffect, useRef, useState } from "react";

// App dependencies
import More from "../../more/more";

// Styles
import * as compStyles from "./dashboard-study-overview.module.css";

interface DashboardStudyOverviewProps {
  ncpi: boolean;
  studyDescription: string;
}

function DashboardStudyOverview(
  props: DashboardStudyOverviewProps
): JSX.Element {
  const { ncpi, studyDescription } = props;
  const refMore = useRef<HTMLDivElement>(null);
  const [showToggleButton, setShowToggleButton] = useState(false);
  const [truncateText, setTruncateText] = useState(false);

  /* useEffect - componentDidMount. */
  useEffect(() => {
    if (!ncpi) {
      const text = refMore.current;
      if (text) {
        const lineHeight = 24; /* <p> line height. */
        const numberLines = text.clientHeight / lineHeight;
        /* Truncate text when the number of lines are greater than 12. */
        if (numberLines > 12) {
          setTruncateText(true);
          setShowToggleButton(true);
        }
      }
    }
  }, [ncpi]);

  return (
    <div className={compStyles.studyOverview}>
      <h3>Description</h3>
      <div
        className={classNames(
          { [compStyles.shortText]: truncateText },
          { [compStyles.fullText]: !truncateText }
        )}
        ref={refMore}
      >
        {/* eslint-disable-next-line react/no-danger */}
        {studyDescription ? (
          <div dangerouslySetInnerHTML={{ __html: studyDescription }} />
        ) : (
          <div>No Description</div>
        )}
      </div>
      {showToggleButton ? (
        <More setTruncateText={setTruncateText} truncateText={truncateText} />
      ) : null}
    </div>
  );
}

export default DashboardStudyOverview;
