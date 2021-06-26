/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - style guide download logo component.
 * Used by the markdown page "/anvil-style-guide/logos".
 * <style-guide-download-logo></style-guide-download-logo>.
 */

// Core dependencies
import React from "react";

// Images
import anvil from "../../../images/brand/anvil.png";
import anvilProject from "../../../images/brand/anvilproject.png";
import anvilProjectOrg from "../../../images/brand/anvilprojectorg.png";
import download from "../../../images/icon/download-grey.png";

// Styles
import compStyles from "./style-guide-download-logo.module.css";

function StyleGuideDownloadLogo() {
  return (
    <>
      <p>The AnVIL logos and icons are available for download below.</p>
      <a className={compStyles.logo} download="anvil" href={anvil}>
        <img src={anvil} alt="anvil" />
        <img src={download} alt="download" />
      </a>
      <a
        className={compStyles.logo}
        download="anvilproject"
        href={anvilProject}
      >
        <img src={anvilProject} alt="anvil project" />
        <img src={download} alt="download" />
      </a>
      <a
        className={compStyles.logo}
        download="anvilprojectorg"
        href={anvilProjectOrg}
      >
        <img src={anvilProjectOrg} alt="anvil project org" />
        <img src={download} alt="download" />
      </a>
    </>
  );
}

export default StyleGuideDownloadLogo;
