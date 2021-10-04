/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard study request access info component.
 */

// Core dependencies
import React from "react";

// Styles
import { link } from "./dashboard-study-request-access-info.module.css";

function DashboardStudyRequestAccessInfo(): JSX.Element {
  return (
    <>
      <h3>Applying For Access</h3>
      <a // eslint-disable-line react/jsx-no-target-blank
        className={link}
        href="https://www.ncbi.nlm.nih.gov/books/NBK5295/"
        target="_blank"
        rel="noopener"
      >
        dbGaP FAQ
      </a>
      <a // eslint-disable-line react/jsx-no-target-blank
        className={link}
        href="https://www.youtube.com/watch?v=m0xp_cCO7kA"
        target="_blank"
        rel="noopener"
      >
        dbGaP Access Request Video Tutorial
      </a>
    </>
  );
}

export default DashboardStudyRequestAccessInfo;
