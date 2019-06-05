/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL typography.
 */

// Core dependencies
import React from "react"

// App dependencies
import Layout from "../components/layout"

// Styles
import compStyles from "./index.module.css";
import fontStyles from "../styles/fontstyles.module.css";

const IndexPage = () => (
    <Layout>
        <div className={compStyles.paraFonts}>
            <div className={fontStyles.alegreyaSans}><span>Alegreya Sans</span><span>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span></div>
            <div className={fontStyles.barlow}><span>Barlow</span><span>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span></div>
            <div className={fontStyles.lato}><span>Lato</span><span>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span></div>
            <div className={fontStyles.mandali}><span>Mandali</span><span>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span></div>
            <div className={fontStyles.notoSansHK}><span>Noto Sans HK</span><span>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span></div>
            <div className={fontStyles.openSans}><span>Open Sans</span><span>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span></div>
            <div className={fontStyles.raleway}><span>Raleway</span><span>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span></div>
            <div className={fontStyles.roboto}><span>Roboto</span><span>The AnVIL team brings together groups that have extensive experience
                building
                open-source platforms, tools, and workflows that are widely used in the genomics community.</span></div>
        </div>
    </Layout>
);

export default IndexPage;
