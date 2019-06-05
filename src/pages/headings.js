/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL typography - headings.
 */

// Core dependencies
import React from "react"

// App dependencies
import Layout from "../components/layout"

// Styles
import compStyles from "./index.module.css";
import fontStyles from "../styles/fontstyles.module.css";

let classNames = require("classnames");

const Headings = () => (
    <Layout>
        <div className={compStyles.paraFonts}>
            <div><span className={classNames(fontStyles.articleSubHeading, fontStyles.nunito)}>About the project</span><span className={fontStyles.barlow}>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span><div>Nunito.</div></div>
            <div><span className={classNames(fontStyles.articleSubHeading, fontStyles.oldStandard)}>About the project</span><span className={fontStyles.barlow}>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span><div>Old Standard.</div></div>
            <div><span className={classNames(fontStyles.articleSubHeading, fontStyles.openSans)}>About the project</span><span className={fontStyles.barlow}>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span><div>Open Sans.</div></div>
            <div><span className={classNames(fontStyles.articleSubHeading, fontStyles.robotoCondensed)}>About the project</span><span className={fontStyles.barlow}>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span><div>Roboto Condensed.</div></div>
            <div><span className={classNames(fontStyles.articleSubHeading, fontStyles.robotoMono)}>About the project</span><span className={fontStyles.barlow}>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span><div>Roboto Mono.</div></div>
            <div><span className={classNames(fontStyles.articleSubHeading, fontStyles.sourceCodePro)}>About the project</span><span className={fontStyles.barlow}>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span><div>Source Code Pro.</div></div>
            <div><span className={classNames(fontStyles.articleSubHeading, fontStyles.rufina)}>About the project</span><span className={fontStyles.barlow}>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span><div>Rufina.</div></div>
            <div><span className={classNames(fontStyles.articleSubHeading, fontStyles.alegreya)}>About the project</span><span className={fontStyles.barlow}>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span><div>Alegreya.</div></div>
            <div><span className={classNames(fontStyles.articleSubHeading, fontStyles.sourceSansPro)}>About the project</span><span className={fontStyles.barlow}>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span><div>Source Sans Pro.</div></div>
        </div>
    </Layout>
);

export default Headings;
