/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL theme 2 page - bright.
 */

// Core dependencies
import React from "react"

// App dependencies
import Layout from "../components/layout"

// Images
import brightImg from "../../images/theme/theme-2.png";

// Styles
import compStyles from "./theme.module.css";
import fontStyles from "../styles/fontstyles.module.css";

let classNames = require("classnames");

const BrightPage = () => (
    <Layout>
        <h1 className={classNames(fontStyles.title, fontStyles.center)}>AnVIL: Inverting the model of genomic data
            sharing</h1>
        <div className={classNames(fontStyles.hero, fontStyles.center)}>User-centered solution for genomic data access,
            analysis, and
            visualization, based on familiar software platforms, engineered for cloud infrastructure.
        </div>
        <img className={compStyles.themeImage} src={brightImg} alt="theme2"/>
    </Layout>
);

export default BrightPage;
