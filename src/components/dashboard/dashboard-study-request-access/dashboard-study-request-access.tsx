/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard study request access component.
 */

// Core dependencies
import React from "react";

// Styles
import {
  requestAccess,
  requestButton,
} from "./dashboard-study-request-access.module.css";

interface Props {
  studyRequestAccessUrl?: string;
}

function DashboardStudyRequestAccess(props: Props): JSX.Element | null {
  const { studyRequestAccessUrl } = props;
  return studyRequestAccessUrl ? (
    <div className={requestAccess}>
      <a // eslint-disable-line react/jsx-no-target-blank
        className={requestButton}
        href={studyRequestAccessUrl}
        rel="noopener"
        target="_blank"
      >
        Request Access
      </a>
    </div>
  ) : null;
}

DashboardStudyRequestAccess.defaultProps = {
  studyRequestAccessUrl: "",
};

export default DashboardStudyRequestAccess;
