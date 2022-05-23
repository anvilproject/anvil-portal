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
import * as AnvilGTMService from "../../../utils/anvil-gtm/anvil-gtm.service";

interface Props {
  studyAccession: string;
  studyRequestAccessUrl?: string;
}

function DashboardStudyRequestAccess(props: Props): JSX.Element | null {
  const { studyAccession, studyRequestAccessUrl } = props;
  return studyRequestAccessUrl ? (
    <div className={requestAccess}>
      <a // eslint-disable-line react/jsx-no-target-blank
        onClick={() => onRequestAccessClicked(studyAccession)}
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

/**
 * Track click on request access for the given accession.
 * @param studyAccession - ID of study that access was requested  for.
 */
function onRequestAccessClicked(studyAccession: string) {
  AnvilGTMService.trackStudyRequestAccess(studyAccession);
}

DashboardStudyRequestAccess.defaultProps = {
  studyRequestAccessUrl: "",
};

export default DashboardStudyRequestAccess;
