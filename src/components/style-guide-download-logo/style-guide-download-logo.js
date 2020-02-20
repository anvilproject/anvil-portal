/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - style guide download logo component.
 * Used by the markdown page "/anvil-style-guide/logos".
 * Use the closed tag syntax <style-guide-download-logo></style-guide-download-logo>.
 */

// Core dependencies
import React from "react";

// Images
import anvil from "../../../images/brand/anvil.png";
import anvilProject from "../../../images/brand/anvilproject.png";
import anvilProjectOrg from "../../../images/brand/anvilprojectorg.png";
import download from "../../../images/icon/download.png";

// Styles
import compStyles from "./style-guide-download-logo.module.css";

class StyleGuideDownloadLogo extends React.Component {

    render() {
        return (
            <>
                <a className={compStyles.logo} download="anvil" href={anvil}>
                    <img src={download} alt="download"/>
                    <img src={anvil} alt="anvil"/>
                </a>
                <a className={compStyles.logo} download="anvilproject" href={anvilProject}>
                    <img src={download} alt="download"/>
                    <img src={anvilProject} alt="anvil project"/>
                </a>
                <a className={compStyles.logo} download="anvilprojectorg" href={anvilProjectOrg}>
                    <img src={download} alt="download"/>
                    <img src={anvilProjectOrg} alt="anvil project org"/>
                </a>
            </>
        );
    }
}

export default StyleGuideDownloadLogo;
