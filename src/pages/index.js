/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL theme 1 page - mustard.
 */

// Core dependencies
import React from "react"

// App dependencies
import Layout from "../components/layout"

// Images
import mustardImg from "../../images/theme/theme-1.png";

// Styles
import compStyles from "./theme.module.css";
import fontStyles from "../styles/fontstyles.module.css";

let classNames = require("classnames");

const IndexPage = () => (
    <Layout>
        <h1 className={classNames(fontStyles.title, fontStyles.center)}>AnVIL: Inverting the model of genomic data
            sharing</h1>
        <div className={classNames(fontStyles.hero, fontStyles.center)}>User-centered solution for genomic data access,
            analysis, and
            visualization, based on familiar software platforms, engineered for cloud infrastructure.
        </div>
        <img className={compStyles.themeImage} src={mustardImg} alt="theme1"/>
    </Layout>
);

export default IndexPage;
