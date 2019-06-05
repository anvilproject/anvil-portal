/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - typography test.
 * Noto Sans HK
 */

// Core dependencies
import React from "react"

// App dependencies
import Layout from "../components/layout"

// Styles
import fontStyles from "../styles/fontstyles.module.css";

let classNames = require("classnames");

const NotoSansHK = () => (
    <Layout>
        <h1 className={classNames(fontStyles.articleHeading, fontStyles.openSans)}>AnVIL: Noto Sans HK</h1>
        <div className={fontStyles.notoSansHK}>
            <p>The AnVIL is a 5-year project funded by the NIH to create a managed platform for genomics researchers.
                Led by the Broad Institute and Johns Hopkins University, the project is a large consortium bringing
                together some of the most popular data analysis and management tools to form a virtual laboratory that
                allows researcher to readily access, use, and collaborate using most popular tools, data, and
                technologies.</p>
            <p>Invert the model of genomic data access and sharing. The AnVIL is a 5-year project funded by the NIH to
                create a managed platform for genomics researchers. Led by the Broad Institute and Johns Hopkins
                University, the project is a large consortium bringing together some of the most popular data analysis
                and management tools to form a virtual laboratory that allows researcher to readily access, use, and
                collaborate using most popular tools, data, and technologies.</p>
            <p>Working groups take on the responsibility for specific portions of the project and its day-to-day
                operations.</p>
            <p>The AnVIL team brings together groups that have extensive experience building open-source platforms,
                tools, and workflows that are widely used in the genomics community. The project will include
                Bioconductor, Galaxy, Gen3, Terra, and Jupyter to start and include extension points for adding more
                tools and services. The AnVIL project will leverage those tools to build a more accessible and
                integrated platform for the genomics researchers.</p>
        </div>
    </Layout>
);

export default NotoSansHK;
